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