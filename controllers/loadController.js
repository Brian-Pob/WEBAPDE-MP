const userModel = require('../models/userModel')
const memeModel = require('../models/memeModel')
const formidable = require('formidable')

function loadModule(server){

    server.get('/', function (req, resp) {
        console.log('went here')
        if (req.session.user === undefined) {
            memeModel.viewAllPublicMemes(function(list){
                var data = {
                    list: list
                }
                resp.render('./index', {data: data})
            })
           

        } else {
            var data
            memeModel.viewAllPublicMemes(function(list){
                data = {
                    user: req.session.user,
                    list: list
                }
                resp.render('./index', {data: data})
            })
            
            // userModel.findOne(searchQuery, function (req, user) {
            //     resp.render('./index', {
            //         data: user
            //     })
            // })
            
        }
    })

    server.post('/login', function (req, resp) {
        var password = req.body.inputPasswordLogin
        var username = req.body.inputUsernameLogin

        userModel.loginUser(username, password, function(result){
            if(result){
                var data = {
                    username: username
                }
                req.session.user = username
                resp.render('./index', {
                    
                    data: data
                })
            }
                
        })
        
    })

    server.get('/logout', function (req, resp) {

        req.session.destroy()
        var data = {
            user: null
        }
        console.log('should be logged out')
        resp.render('./index')
    })

    
}

module.exports.Activate = loadModule