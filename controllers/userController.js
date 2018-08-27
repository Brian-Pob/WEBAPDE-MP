const userModel = require('../models/userModel')
const formidable = require('formidable')
const crypto = require('crypto')
function userModule(server) {


    server.post('/signup', function (req, resp) {
        
        var password = req.body.inputPasswordSignup
        var username = req.body.inputUsernameSignup
        
        userModel.createUser(username, password, function(){
            req.session.user = username
            resp.redirect('/')
        })

        
    })

    server.get('/visitprofile', function (req, resp) {
        
        var user = req.session.user
        
        userModel.searchForProfile(user, function (userData) {
            resp.render('./profilepage.ejs', {userData : userData})
        })
    })

    
}
module.exports.Activate = userModule;