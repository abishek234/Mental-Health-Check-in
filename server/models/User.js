const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true },   
    password: { type: String, required: true },
    phoneno : { type: Number, required: true },
    location : { type: String, required: true },
  

});

module.exports = mongoose.model('User', UserSchema);