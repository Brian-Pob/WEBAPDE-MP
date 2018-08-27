const userModel = require('../models/userModel')
const formidable = require('formidable')
const crypto = require('crypto')
function userModule(server) {


    server.post('/signup', function (req, resp) {
        
        var password = req.body.inputPasswordSignup
        var username = req.body.inputUsernameSignup
        userModel.checkIfExists(username, function(userResult){
            if(userResult == undefined){
                userModel.createUser(username, password, function(){
                    req.session.user = username
                    resp.redirect('/')
                })
            }else{
                resp.redirect('/?signup=exists')
            }
        })

        
    })

    server.get('/visitprofile', function (req, resp) {
        
        var user = req.session.user
        
        userModel.searchForProfile(user, function (userData) {
            resp.render('./profilepage.ejs', {userData : userData})
        })
    })

    server.post('/edit', function(req,resp){
        
        var profPic = req.body.inputProfileImage
        var profDesc = req.body.inputDescription 
        var user = req.session.user

        if(profPic != null){
            userModel.editProfilePic(user, profPic, function(userData){
                resp.redirect('/visitprofile')
            })
        }
        if(profDesc != null){
            userModel.editProfileDesc(user, profDesc, function(userData){
                resp.redirect('/visitprofile')
            })
        }

    })

    
}
module.exports.Activate = userModule;