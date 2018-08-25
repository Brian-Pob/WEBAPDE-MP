const mongoose = require('./connectionBase').connection
const dateTime = require('node-datetime')

//MEME
const memeSchema = new mongoose.Schema({
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
        type: [String] //array of comment IDs (ideally, but could just be array of comments)
    },
    tags: {
        type: [String]
    },
    datePosted: {
        type: String //date the post was created
    }
})

function viewAllPublicMemes(server){
    
}

function viewAllProfileMemes(server){
    
}

//SEARCHING BY NAME AND TAG
function viewMemesbySearchName(server){
    
}

function viewMemesbySearchTag(server){
    
}

function uploadMeme(server){
    
}

function editMeme(server){
    
}

function deleteMeme(server){
    
}

//Should add auto complete
function searchMemeByName(server){
    
}

function searchMemeByTag(server){
    
}

const memeModel = mongoose.model('posts', memeSchema)

function createMeme(memeTitle, memeImageLink, memePoster, memeTags, callback){
    var dt = dateTime.create()
    var dtFormat = dt.format('m/d/Y')

    const memeInstance = memeModel({
        user: memePoster,
        title: memeTitle,
        image: memeImageLink,
        comments: [],
        tags: memeTags,
        datePosted: dtFormat
    })

    memeInstance.save(function (err, res) {
        if (err)  return console.error(err)
        else {
            callback()
        }
    })
}

module.exports.createMeme = createMeme