const express = require('express')

const server = express()
server.use(express.urlencoded({
    extended: true
}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(bodyParser.json())

const crypto = require('crypto')

const session = require('express-session')
const mongoStore = require('connect-mongo')(session)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb', {
    useNewUrlParser: true
})

server.use(session({
    secret: 'memes',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60,
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

server.get('/', function (req, resp) {
    if (req.session.user === undefined) {
        resp.render('./index')
        
    }else {
        var searchQuery = {
            user: req.session.user
        }
        userModel.findOne(searchQuery, function(req, user){
            resp.render('./index', {
                data: user
            })
        })
    }
})

server.post('/signup', function (req, resp) {
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

    userInstance.save(function (err, res) {
        if (err) return console.error(err)
        else {
            req.session.user = userInstance.user
            resp.render('./index', {
                data: userInstance
            })
        }

    })
})

server.post('/login', function (req, resp) {
    var password = req.body.inputPasswordLogin

    const searchQuery = {
        user: req.body.inputUsernameLogin,
        pass: crypto.createHash('md5').update(password).digest('hex')
    }

    userModel.findOne(searchQuery, function (err, logindata) {
        if (err) return console.error(err)
        if (logindata !== undefined && logindata._id !== null) {
            // resp.redirect('/?login=success')
            req.session.user = logindata.user
            console.log(req.session.user)

            resp.render('./index', {
                data: logindata
            })
        } else {
            resp.redirect('/?login=failed')
        }

    })
})

server.get('/logout', function (req, resp) {
    
    // var emptyData = {
    //     _id: 'empty',
    //     user: 'empty',
    //     pass: 'empty'
    // }
    req.session.user = null
    resp.render('./index')
})

server.get('/visitprofile', function (req, resp) {
    var searchQuery = {
        user: req.session.user
    }
    userModel.findOne(searchQuery, function (err, user) {
        //get user posts
        //get user date joined
        //get user posts
    })
    resp.render('./profilepage')
})

const postSchema = new mongoose.Schema({
    user: {
        type: String // name of the person
    },
    title: {
        type: String
    },
    image: {
        type: String //url of the image
    },
    comments: {
        type: [String] //array of comment IDs
    },
    tags: {
        type: [String]
    },
    datePosted: {
        type: String //date the post was created
    }
})

const memeModel = mongoose.model('posts', postSchema)

server.post('/createpost', function (req, resp) {
    var dt = dateTime.create()
    var dtFormat = dt.format('m/d/Y')
    var tags = req.body.inputTags

    const postInstance = memeModel({
        user: req.session.user,
        title: req.body.inputPostTitle,
        image: req.body.inputPostLink,
        comments: [],
        tags: tags.split(','),
        datePosted: dtFormat
    })

    postInstance.save(function (err, res) {
        if (err) return console.error(err)
        resp.render('/index')
    })
})
const port = process.env.PORT | 9090
server.listen(port)