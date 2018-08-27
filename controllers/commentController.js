const commentModel = require('../models/commentModel')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs');


function commentModule(server){
    
    server.post('/system-processing/addcomment-result', function (req, resp) {
        var form = new formidable.IncomingForm()
        
    })
    
    server.get('/viewComments', function (req, resp){
        commentModel.viewComments(function(list){
            const data = {list:list};
            resp.render('/index', {data : data})
        })
    })

    server.get('/viewProfileMemes', function (req, resp){
        
    })
}


//triallsaldapsdlasldalskdlkasdl
    


module.exports.Activate = commentModule;