const mongoose = require('./connectionBase').connection
const dateTime = require('node-datetime')
const crypto = require('crypto')

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

//functions
function createUser(usernameInput, passwordInput, callback) {

    var dt = dateTime.create();
    var dtFormat = dt.format('m/d/Y')

    const userInstance = userModel({
        user: usernameInput,
        pass: crypto.createHash('md5').update(passwordInput).digest('hex'),
        datejoined: dtFormat,
        profilePic: 'imgs/blank-profile.jpg',
        posts: []
    })

    userInstance.save(function (err, res) {
        if (err) return console.error(err)
        else {
            // req.session.user = userInstance.user
            callback()
        }

    })

}
module.exports.createUser = createUser