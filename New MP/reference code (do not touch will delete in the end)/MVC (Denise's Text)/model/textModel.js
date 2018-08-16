//This is the LoginModel.
//All connections to the collection called login will be done using this class.

//Contain all Mongoose code that will be used for the login
const mongoose = require('./connectionBase').connection;

const textSchema = new mongoose.Schema({
  texti: { type: String }
},{ versionKey: false });

const textModel = mongoose.model('text', textSchema);

function addTexti(textiV, callback){
  const instance = textModel({ texti: textiV});
  
  instance.save(function (err, inv) {
    if(err) return console.error(err);
    callback();
  });
}

module.exports.addTexti = addTexti;

function viewTexti(callback){
  textModel.find({}, function (err, list) {
    if(err) return console.error(err);
    callback(list);
  });
}

module.exports.viewTexti = viewTexti;

//function deleteTexti(textiV, callback){
//  const instance = textModel({ texti: textiV});
//  
//  instance.delete(function (err, inv) {
//    if(err) return console.error(err);
//    callback();
//  });
//}

//module.exports.deleteTexti = deleteTexti;

