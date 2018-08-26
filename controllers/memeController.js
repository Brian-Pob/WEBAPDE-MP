const memeModel = require('../models/memeModel')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs');


function memeModule(server){
    
    server.post('/system-processing/uploadpost-result', function (req, resp) {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files){
            var oldpath = files.inputPostImage.path
            var newpath = __dirname + '/../public/imgs/upload/' + files.inputPostImage.name

            fs.rename(oldpath, newpath, function(err){
                // console.log('file transfer start')
                if (err) throw err;
                //title, path, user, tags, function
                var title = fields.inputPostTitle
                var postTags = fields.inputTags
                postTags = postTags.trim()
                var postTagsArr = postTags.split(',')
                var user = req.session.user
                console.log('Test fields.inputVisibility:')
                console.log(fields.inputVisibility === 'Private')
                var memeVisibility = (fields.inputVisibility === 'Private')
                console.log('Test memeVisibility:')
                console.log(memeVisibility)


                // console.log(title)
                // console.log(postTagsArr)
                // console.log(newpath)
                // console.log(req.session.user)

                memeModel.uploadMeme(title, files.inputPostImage.name, user, postTagsArr, memeVisibility, function(){
                    resp.redirect('/')
                })

            })
        })
        
    })
    
    server.get('/viewPublicMemes', function (req, resp){
        memeModel.viewAllPublicMemes(function(list){
            const data = { list:list};
            resp.render('/index', {data : data})
        })
    })

    server.get('/viewProfileMemes', function (req, resp){
        
    })

    server.get('/viewMemeSearchByName', function (req, resp){
        
    })

    server.get('/viewMemeSearchByTag', function (req, resp){
        
    })

    server.get('/uploadMeme', function (req, resp){
        
    })

    server.get('/editMeme', function (req, resp){
        
    })

    server.get('/deleteMeme', function (req, resp){
        
    })
    
    server.get('/searchMemeByName', function (req, resp){
        
    })

    server.get('/searchMemeByTag', function (req, resp){
        
    })
}


//triallsaldapsdlasldalskdlkasdl
    


module.exports.Activate = memeModule;