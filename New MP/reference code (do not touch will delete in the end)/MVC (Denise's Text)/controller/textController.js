const textModel = require('../model/textModel');
const formidable = require('formidable'); 
const fs = require('fs');

function TextModule(server){
    
  server.get('/', function(req, resp){
    textModel.viewTexti(function(list){
      const data = { list:list };
      resp.render('./pages/home',{ data:data });
    });
  });

  server.get('/addTexti', function(req, resp){
    resp.render('./pages/home');
  });

  server.post('/system-processing/addtexti-result', function(req, resp){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        textModel.addTexti(fields.texti,function(){
            resp.redirect('/');
        });//addInv
    });//parse
  });//post
    
    
//  server.get('/deleteTexti', function(req, resp){
//    resp.render('./pages/home');
//  });
//    
//  server.post('/system-processing/deletetexti-result', function(req, resp){
//    var form = new formidable.IncomingForm();
//    form.parse(req, function (err, fields, files) {
//        textModel.deleteTexti(fields.texti,function(){
//            resp.redirect('/');
//            //"you can go to another url and go back?"
//        });//addInv
//    });
//  });//post
}

module.exports.Activate = TextModule;
