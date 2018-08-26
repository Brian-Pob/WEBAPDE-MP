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
        var searchQuery = {
            user: req.session.user
        }
        userModel.viewProfile(searchQuery, function (err, user) {
        let id = req.query.id
        userModel.findUserByID(id).then((profile)=>{
            let user = req.session.user
            if (user) {
                res.render("profilepage.ejs", {user, profile})
            }
        })
                
            
            //get user posts
            //get user date joined
            //get user posts
        })
    })

    
}
module.exports.Activate = userModule;