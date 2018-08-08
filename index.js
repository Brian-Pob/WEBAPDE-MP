const express = require('express')

const server = express()
server.use(express.urlencoded({extended: true}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb',{useNewUrlParser: true})

server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs')

const loginSchema = new mongoose.Schema({
    user: {
        type: String
    },
    pass: {
        type: String
    }
}, {
    versionKey: false
})
const loginModel = mongoose.model('users', loginSchema)

server.get('/', function(req, resp){
    resp.render('./index', {
        logindata: undefined
    })
})

server.post('/signup', function(req, resp){
    const userInstance = loginModel({
        user: req.body.inputUsernameSignup,
        pass: req.body.inputPasswordSignup
    })

    userInstance.save(function(err, res){
        if(err) return console.error(err)
        else
            resp.render('./profilepage')
    })
})

server.post('/login', function(req, resp){
    const searchQuery = {
        user: req.body.inputUsernameLogin,
        pass: req.body.inputPasswordLogin
    }

    loginModel.findOne(searchQuery, function(err, login){
        if(err) return console.error(err)
        if(login !== undefined && login._id !== null){
            resp.redirect('/?login=success')
        }else{
            resp.redirect('/?login=failed')
        }

    })
})
const port = process.env.PORT | 9090
server.listen(port)