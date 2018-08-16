const mongoose = require('./connectionBase').connection;


const userSchema = new mongoose.Schema({
    user:       {type: String},
    pass:       {type: String},
    datejoined: {type: String},
    profilePic: {type: String},
    posts:      {type: [String]}
}, {versionKey: false});

const loginModel = mongoose.model('login', loginSchema); // Name might change idk about loginSchema

function login(username, password, callback){
  const searchQuery = { user: username, pass: password };

  loginModel.findOne(searchQuery, function (err, login) {
    if(err) return console.error(err);
    callback(login != undefined && login._id != null);
  });
}

module.exports.login = login;

//server.post('/login', function(req, resp){
//    var password = req.body.inputPasswordLogin
//
//    const searchQuery = {
//        user: req.body.inputUsernameLogin,
//        pass: crypto.createHash('md5').update(password).digest('hex')
//    }
//
//    userModel.findOne(searchQuery, function(err, login){
//        if(err) return console.error(err)
//        if(login !== undefined && login._id !== null){
//            // resp.redirect('/?login=success')
//            req.session.user = login.user
//            console.log(req.session.user)
//            
//            resp.render('./index', {
//                data: login
//            })
//        }else{
//            resp.redirect('/?login=failed')
//        }
//
//    })
//})

function signUp(user, pass, datejoined, profilePic, callback){
    var dt = dateTime.create();
    var dtFormat = dt.format('m/d/Y')
    //var password = req.body.inputPasswordSignup
    const userInstance = userModel({
        user: req.body.inputUsernameSignup,
        pass: crypto.createHash('md5').update(password).digest('hex'),
        datejoined: dtFormat,
        profilePic: 'imgs/blank-profile.jpg',
        posts: []
    })
    
  instance.save(function (err, login) {
    if(err) return console.error(err);
    callback();
  });
    
}

module.exports.signUp = signUp;

//server.post('/signup', function(req, resp){
//    var dt = dateTime.create();
//    var dtFormat = dt.format('m/d/Y')
//    var password = req.body.inputPasswordSignup
//    
//    const userInstance = userModel({
//        user: req.body.inputUsernameSignup,
//        pass: crypto.createHash('md5').update(password).digest('hex'),
//        datejoined: dtFormat,
//        profilePic: 'imgs/blank-profile.jpg',
//        posts: []
//    })
//
//    userInstance.save(function(err, res){
//        if(err) return console.error(err)
//        else{
//            req.session.user = userInstance.user
//            resp.render('./index', {
//                data: userInstance
//            })
//        }
//    })
//})

function logout(id, username, password, callback){
  const emptyData = { _id: 'empty', user: 'empty', pass: 'empty'}
  
  // I don't know what to do here tbh. 
}


//server.get('/logout', function(req, resp){
//    var emptyData = {
//        _id: 'empty',
//        user: 'empty',
//        pass: 'empty'
//    }
//    resp.render('./index', {
//        data: emptyData
//    })
//})
