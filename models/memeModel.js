const mongoose = require('./connectionBase').connection


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

const memeModel = mongoose.model('posts', memeSchema)