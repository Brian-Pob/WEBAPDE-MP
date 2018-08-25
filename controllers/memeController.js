const memeModel = require('../models/memeModel')
const formidable = require('formidable');
const fs = require('fs');


function memeModule(server){
    
    server.post('/system-processing/uploadpost-result', function (req, resp) {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files){
            var oldpath = files.inputPostImage.path
            var newpath = __dirname + '/../public/imgs/upload/' + files.inputPostImage.name

            fs.rename(oldpath, newpath, function(err){
                console.log('file transfer start')
                if (err) throw err;
                //title, path, user, tags, function
                var title = fields.inputPostTitle
                var postTags = fields.inputTags
                postTags = postTags.replace(' ','')
                var postTagsArr = postTags.split(',')
                var user = req.session.user
                console.log(title)
                console.log(postTagsArr)
                console.log(newpath)
                console.log(req.session.user)

                memeModel.uploadMeme(title, newpath, user, postTagsArr, function(){
                    resp.redirect('/')
                })

            })
        })
        
    })
/*
  server.post('/system-processing/addinvetory-result', function(req, resp){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image.path;
      var newpath = __dirname + '/../public/upload/' + files.image.name;
      fs.rename(oldpath, newpath, function (err) {
        console.log('file transfer started');
        if (err) throw err;
        console.log('NUMBER: '+fields.price);
        var num = Number(fields.price);
        if(isNaN(num))
          num = 500;
        invetoryModel.addInvetory(fields.item, files.image.name, num ,function(){
          resp.redirect('/home');
        });//addInv

      });//rename

    });//parse

  });//post


*/
    
    
    server.get('/viewPublicMemes', function (req, resp){
        
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