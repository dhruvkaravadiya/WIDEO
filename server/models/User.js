const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    videos:{
        type:[String]
    },
    subscribers:{
        type:Number,
        default:0,
    },
    subscribedChannels:{
        type:[String]
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;