const userModel = require('../models/userModel')
const formidable = require('formidable');

const fs = require('fs');

function userModule(server) {

    server.post('/signup', function (req, resp) {
        
        var form = new formidable.IncomingForm()
        console.log('went into signup')
        form.parse(req, function(err, fields, files){
            console.log('went into form parse')
            
            var oldpath = files.inputProfileImage.path
            var newpath = __dirname + '/../public/imgs/upload/' + files.inputProfileImage.name

            fs.rename(oldpath, newpath, function (err) {
                var password = fields.inputPasswordSignup
                var username = fields.inputUsernameSignup
                var description = fields.inputDescriptionSignup   
                console.log('file transfer start')
                if (err) throw err;
                userModel.checkIfExists(username, function(userResult){
                    console.log('check if exists')
                    if(userResult == undefined){
                        userModel.createUser(username, password, description, files.inputProfileImage.name, function(){
                            req.session.user = username
                            resp.redirect('/')
                        })
                    }else{
                        resp.redirect('/?signup=exists')
                    }
                })

            })
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