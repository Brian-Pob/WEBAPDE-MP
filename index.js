const express = require('express')

const server = express()
server.use(express.urlencoded({extended: true}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

const mongoStore = require('connect-mongo')(session);
const session = require('express-session')
server.use(session({
    secret: 'meme supreme',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60,
        autoRemove: 'native'
    })
}))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb',{useNewUrlParser: true})

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

const loginModel = mongoose.model('login', loginSchema)
server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs')

server.get('/', function(req, resp){
    resp.render('./index')
})



server.post('/login', function(req, resp){
    const searchQuery = {
        user: req.body.inputUsernameLogin,
        pass: req.body.inputPasswordLogin
    }
    loginModel.findOne(searchQuery, function(req, login){
        if(login !== undefined && login._id !== undefined){
            req.session.user = login.user
            resp.render('./index', {
                data: login
            })
        }else
            resp.render('./index?login=failed')
    })
})

server.get('/signup', function(req, resp){

})

server.get('/logout', function(req, resp){
    resp.render('./index', {
        data: undefined
    })
})

server.get('/visitprofile', function(req, resp){
    resp.render('./profilepage')
})
const port = process.env.PORT | 9090
server.listen(port)