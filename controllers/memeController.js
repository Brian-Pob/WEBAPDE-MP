const memeModel = require('../models/memeModel')

function memeModule(server){
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
    
    
}

    server.get('/viewPublicMemes', function (req, resp){
        
    })

    server.get('/viewProfileMemes', function (req, resp){
        
    })

    server.get('/viewMemeSearchByName', function (req, resp){
        
    })

    server.get('/viewMemeSearchByTag', function (req, resp){
        
    })

    server.get('/uploadMeme', function (req, resp){
        
    })

    server.get('/editMeme', function (req, resp){
        
    })

    server.get('/deleteMeme', function (req, resp){
        
    })
    
    server.get('/searchMemeByName', function (req, resp){
        
    })

    server.get('/searchMemeByTag', function (req, resp){
        
    })

    


module.exports.Activate = memeModule;