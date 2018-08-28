const memeModel = require('../models/memeModel')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs');


function memeModule(server) {

    server.post('/system-processing/uploadpost-result', function (req, resp) {
            var form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                    var oldpath = files.inputPostImage.path
                    var newpath = __dirname + '/../public/imgs/upload/' + files.inputPostImage.name

                    fs.rename(oldpath, newpath, function (err) {
                            // console.log('file transfer start')
                            if (err) throw err;
                            //title, path, user, tags, function
                            var title = fields.inputPostTitle
                            var postTags = fields.inputTags
                            postTags = postTags.trim()
                            var postTagsArr = postTags.split(',')
                            var user = req.session.user
                            var memeVisibility = (fields.inputVisibility === 'Private')
                            var sharedUser = fields.inputSharedUser
                            // console.log(sharedUser)
                            // console.log(typeof sharedUser)
                            if (sharedUser !== ''){

                                // console.log('Shared User')
                                memeModel.uploadMeme(title, files.inputPostImage.name, user, postTagsArr, memeVisibility, sharedUser, function () {
                                    resp.redirect('/')
                                })   
                            }
                            else {
                                // console.log('sharedUser NULL')
                                sharedUser = null
                                memeModel.uploadMeme(title, files.inputPostImage.name, user, postTagsArr, memeVisibility, sharedUser, function () {
                                        resp.redirect('/')
                                })
                            }
                        })
                })

        })

        server.get('/viewPublicMemes', function (req, resp) {
            memeModel.viewAllPublicMemes(function (list) {
                const data = {
                    list: list
                };
                resp.render('/index', {
                    data: data
                })
            })
        })

        server.get('/viewMemeSearchByTag', function (req, resp) {
            
        })
    
        server.get('/viewProfileMemes', function (req, resp) {
            memeModel.viewAllProfileMemes(function (list) {
                const data = {
                    list: list
                };
                resp.redirect('/visitprofile', {
                    data: data
                })
            })
        })


        server.get('/editMeme', function (req, resp) {

        })

        server.get('/deleteMeme', function (req, resp) {

        })

        server.get('/searchMemeByName', function (req, resp) {

        })
    }


    //triallsaldapsdlasldalskdlkasdl



    module.exports.Activate = memeModule;