const userModel = require('../models/userModel')
const formidable = require('formidable')
const crypto = require('crypto')
function userModule(server) {

    server.get('/', function (req, resp) {
        if (req.session.user === undefined) {
            resp.render('./index')

        } else {
            var searchQuery = {
                user: req.session.user
            }
            userModel.findOne(searchQuery, function (req, user) {
                resp.render('./index', {
                    data: user
                })
            })
        }
    })

    server.post('/signup', function (req, resp) {
        
        var password = req.body.inputPasswordSignup
        var username = req.body.inputUsernameSignup
        var data = {
            username: username
        }
        userModel.createUser(username, password, function(){
            resp.render('./index', {
                data: data
            })
        })

        
    })

    server.post('/login', function (req, resp) {
        var password = req.body.inputPasswordLogin
        var username = req.body.inputUsernameLogin

        userModel.loginUser(username, password, function(result){
            if(result){
                data = {
                    username: username
                }
                resp.render('./index', {
                    data: data
                })
            }
                
        })
        
    })

    server.get('/logout', function (req, resp) {

        // var emptyData = {
        //     _id: 'empty',
        //     user: 'empty',
        //     pass: 'empty'
        // }
        req.session.user = null
        resp.render('./index')
    })

    server.get('/visitprofile', function (req, resp) {
        var searchQuery = {
            user: req.session.user
        }
        userModel.findOne(searchQuery, function (err, user) {
            //get user posts
            //get user date joined
            //get user posts
        })
        resp.render('./profilepage')
    })

}
module.exports.Activate = userModule;