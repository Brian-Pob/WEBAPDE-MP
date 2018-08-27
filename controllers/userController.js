const userModel = require('../models/userModel')
const formidable = require('formidable')
const crypto = require('crypto')
function userModule(server) {


    server.post('/signup', function (req, resp) {
        
        var password = req.body.inputPasswordSignup
        var username = req.body.inputUsernameSignup
        var description = req.body.inputDescriptionSignup
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            var oldpath = files.inputPostImage.path
            var newpath = __dirname + '/../public/imgs/upload/' + files.inputPostImage.name

            fs.rename(oldpath, newpath, function (err) {
                    // console.log('file transfer start')
                    userModel.checkIfExists(username, function(userResult){
                        if(userResult == undefined){
                            userModel.createUser(username, password, description, files.inputProfileImage.name, function(){
                                req.session.user = username
                                resp.redirect('/')
                            })
                        }else{
                            resp.redirect('/?signup=exists')
                        }
                    if (err) throw err;}); 
                    })
            })


            
        


        

        
    })

    server.get('/visitprofile', function (req, resp) {
        
        var user = req.session.user
        
        userModel.searchForProfile(user, function (userData) {
            resp.render('./profilepage.ejs', {userData : userData})
        })
    })

    // server.post('/edit', function(req,resp){
        
    //     var profPic = req.body.inputProfileImage
    //     var profDesc = req.body.inputDescription 
    //     var user = req.session.user

    //     if(profPic != null){
    //         userModel.editProfilePic(user, profPic, function(userData){
    //             resp.redirect('/')
    //         })
    //     }
    //     if(profDesc != null){
    //         userModel.editProfileDesc(user, profDesc, function(userData){
    //             resp.redirect('/')
    //         })
    //     }

    // })

    
}
module.exports.Activate = userModule;