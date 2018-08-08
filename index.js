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
    resp.render('./index')
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
const port = process.env.PORT | 9090
server.listen(port)