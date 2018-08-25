const userModel = require('../models/userModel')
const formidable = require('formidable')

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

    server.post('/system-processing/signup-result', function (req, resp) {
        
        var password = req.body.inputPasswordSignup
        var username = req.body.inputUsernameSignup

        userModel.createUser(username, password, function(){
            resp.redirect('/index')
        })

        
    })

    server.post('/login', function (req, resp) {
        var password = req.body.inputPasswordLogin

        const searchQuery = {
            user: req.body.inputUsernameLogin,
            pass: crypto.createHash('md5').update(password).digest('hex')
        }

        userModel.findOne(searchQuery, function (err, logindata) {
            if (err) return console.error(err)
            if (logindata !== undefined && logindata._id !== null) {
                // resp.redirect('/?login=success')
                req.session.user = logindata.user
                console.log(req.session.user)

                resp.render('./index', {
                    data: logindata
                })
            } else {
                resp.redirect('/?login=failed')
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