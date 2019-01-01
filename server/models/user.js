const mongoose = require('mongoose');


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
  token:{
    type:String,
    required:false,
    trim:true,
  },
  profilePicUrl:{
    type:String,
    required:false,
    trim:true,
  }
});




var User = mongoose.model('UserAdboy',UserSchema);

module.exports = {User};
