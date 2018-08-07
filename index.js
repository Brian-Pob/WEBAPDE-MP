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

server.get('/', function(req, resp){
    resp.render('./index')
})

const port = process.env.PORT | 9090
server.listen(port)