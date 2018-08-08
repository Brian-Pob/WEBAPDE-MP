const express = require('express')

const server = express()
server.use(express.urlencoded({extended: true}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

const crypto = require('crypto')

const session = require('express-session')
const mongoStore = require('connect-mongo')(session)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb',{useNewUrlParser: true})

server.use(session({
    secret: 'memes',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60*60,
        autoRemove: 'native'
    })
}))

const dateTime = require('node-datetime')



server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs')

// const loginSchema = new mongoose.Schema({
//     user: {
//         type: String
//     },
//     pass: {
//         type: String
//     }
// }, {
//     versionKey: false
// })
// const loginModel = mongoose.model('users', loginSchema)

const userSchema = new mongoose.Schema({
    user: {
        type: String
    },
    pass: {
        type: String
    },
    datejoined: {
        type: String
    },
    profilePic: {
        type: String
    },
    posts: {
        type: [String]
    }
}, {
    versionKey: false
})
const userModel = mongoose.model('users', userSchema)

server.get('/', function(req, resp){
    var emptyData = {
        _id: 'empty',
        user: 'empty',
        pass: 'empty'
    }
    resp.render('./index', {
        data: emptyData
    })
})

server.post('/signup', function(req, resp){
    var dt = dateTime.create();
    var dtFormat = dt.format('m/d/Y')
    var password = req.body.inputPasswordSignup

    const userInstance = userModel({
        user: req.body.inputUsernameSignup,
        pass: crypto.createHash('md5').update(password).digest('hex'),
        datejoined: dtFormat,
        profilePic: 'imgs/blank-profile.jpg',
        posts: []
    })

    userInstance.save(function(err, res){
        if(err) return console.error(err)
        else{
            req.session.user = userInstance.user
            resp.render('./index', {
                data: userInstance
            })
        }
            
    })
})

server.post('/login', function(req, resp){
    var password = req.body.inputPasswordLogin

    const searchQuery = {
        user: req.body.inputUsernameLogin,
        pass: crypto.createHash('md5').update(password).digest('hex')
    }

    userModel.findOne(searchQuery, function(err, login){
        if(err) return console.error(err)
        if(login !== undefined && login._id !== null){
            // resp.redirect('/?login=success')
            req.session.user = login.user
            console.log(req.session.user)
            
            resp.render('./index', {
                data: login
            })
        }else{
            resp.redirect('/?login=failed')
        }

    })
})

server.get('/logout', function(req, resp){
    var emptyData = {
        _id: 'empty',
        user: 'empty',
        pass: 'empty'
    }
    resp.render('./index', {
        data: emptyData
    })
})

server.get('/visitprofile', function(req, resp){
    var searchQuery = {
        user: req.session.user
    }
    userModel.findOne(searchQuery, function(err, user){
        //get user posts
        //get user date joined
        //get user posts
    })
    resp.render('./profilepage', {
        data:data
    })
})
const port = process.env.PORT | 9090
server.listen(port)