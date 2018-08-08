const express = require('express')

const server = express()
server.use(express.urlencoded({extended: true}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb',{useNewUrlParser: true})

var dateTime = require('node-datetime')

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
    
    const userInstance = userModel({
        user: req.body.inputUsernameSignup,
        pass: req.body.inputPasswordSignup,
        datejoined: dtFormat,
        profilePic: 'imgs/blank-profile.jpg',
        posts: []
    })

    userInstance.save(function(err, res){
        if(err) return console.error(err)
        else
            resp.render('./index', {
                data: userInstance
            })
    })
})

server.post('/login', function(req, resp){
    const searchQuery = {
        user: req.body.inputUsernameLogin,
        pass: req.body.inputPasswordLogin
    }

    userModel.findOne(searchQuery, function(err, login){
        if(err) return console.error(err)
        if(login !== undefined && login._id !== null){
            // resp.redirect('/?login=success')
            var logindata = {login: login}
            resp.render('./index', {
                data: logindata
            })
        }else{
            resp.redirect('/?login=failed')
        }

    })
})
const port = process.env.PORT | 9090
server.listen(port)