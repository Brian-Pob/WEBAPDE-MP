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



module.exports.Activate = memeModule;