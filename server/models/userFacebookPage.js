const mongoose = require('mongoose');

var UserFbPageSchema = new mongoose.Schema({
  facebookPageId: {
    type:String,
    required:true,
    trim:true,
    minlength:6
  },
  sender_psid: {
    type:String,
    required:true,
    trim:true,
    minlength:6,
    unique:true
  },
  firstName:{
    type:String,
    required:false,
    trim:true
  },
  lastName:{
    type:String,
    required:false,
    trim:true
  },
  profile_pic:{
    type:String,
    required:false,
    trim:true
  },
  timezone:{
    type:String,
    required:false,
    trim:true
  },
  locale:{
    type:String,
    required:false,
    trim:true
  },
  last_ad_referral:{
    type:String,
    required:false,
    trim:true
  },
  last_interaction:{
    type:String,
    required:true,
    trim:true
  },
  user_attributes:
  [{
    attributeName:
    {
      type:String,
      required:false,
      maxlength:20,
      trim:true
    },
    attributeValue:
    {
      type:String,
      required:false,
      maxlength:20,
      trim:true
    }
  }]
});

var UserFbPage = mongoose.model('UserFacebookPage',UserFbPageSchema);

module.exports = {UserFbPage};
