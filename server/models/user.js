const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
  facebookId: {
    type:String,
    required:true,
    trim:true,
    minlength:6,
    unique:true
  },
  firstName:{
    type:String,
    required:false,
    trim:true,
  },
  lastName:{
    type:String,
    required:false,
    trim:true,
  },
  displayName:{
    type:String,
    required:true,
    trim:true,
  },
  isAdboyBotsAdmin:Boolean,
  tokenAdboyBots:{
    type:String,
    required:false,
    trim:true,
  },
  profilePicUrl:{
    type:String,
    required:false,
    trim:true,
  },
  role:{
    type:String,
    enum:['adboyBotsAdmin','adboyBotsUser'],
    default:'adboyBotsUser'
  }

});




var User = mongoose.model('UserAdboy',UserSchema);

module.exports = {User};
