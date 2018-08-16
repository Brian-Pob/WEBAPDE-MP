const loginModel = require('../model/loginModel');


server.get('/', function(req, resp){ //Editting to work with MVC 
    const data = { failedLogin:false }
    
    if(req.query.login !== undefined && req.query.login === 'failed')
      data.failedLogin = true;
    resp.render('./index',{data:emptyData});
})

server.get('/login', function(req, resp){
    resp.render('./pages/addLogin'); //what page will it go in when button for login has been done?
});

server.post('/system-processing/login-result', function(req, resp){ //signing up
    loginModel.addLogin(req.body.user,req.body.pass,function(){
      resp.redirect('/');
    });
});

server.post('/system-processing/login-authentication', function(req, resp){ //logging in
    loginModel.checkLogin(req.body.user,req.body.pass,function(result){
      if(result)
        resp.render('./indez');
      else
        resp.redirect('/?login=failed');
    });
  });
}

//logging off

module.exports.Activate = LoginModule;