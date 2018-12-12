var mongoose = require('mongoose');

var FacebookPage = mongoose.model('FacebookPage',{
  fb_xx:{
    type: String,
    required:true,
    minlength:3,
    trim:true,
    unique: false
  },
  id_page:{
    type: String,
    required:true,
    minlength:3,
    trim:true,
    unique: true
  },
  name_page:{
    type: String,
    required:true,
    minlength:1,
    trim:true
  },
  category_page:{
    type: String,
    required:true,
    minlength:1,
    trim:true
  },
  access_token_page:{
    type: String,
    required:true,
    minlength:1,
    trim:true
  }
});

module.exports ={FacebookPage};
