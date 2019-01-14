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
  },
  url_img_page:{
    type: String,
    required:false,
    minlength:1,
    trim:true
  },
  reachable_users:{
    type: String,
    required:false,
    minlength:1,
    trim:true
  },
  reachable_users_week:{
    type: String,
    required:false,
    minlength:1,
    trim:true
  },
  state:{
    type: String,
    required:false,
    minlength:1,
    trim:true
  }
});

module.exports ={FacebookPage};
