const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        trime: true
    },
    password : {
        type: String,
        required : true
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;