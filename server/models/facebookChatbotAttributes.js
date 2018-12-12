var mongoose = require('mongoose');

var FbChatbotAttributes = mongoose.model('fbChatbotAttributes',{
    facebookPageId:
    {
        type: String,
        required:true,
        minlength:3,
        trim:true,
        unique: true,
    },
    myFBAttributes:[
        {
          fbAttributeName:
          {
            type: String,
            required:false,
            minlength:1,
            trim:true,
            unique: true,
          },
          fbAttributeValues:
          [
            {
                type: String,
                required:false,
                minlength:3,
                trim:true,
                unique: true, 
            }
          ]
        }
      ]
  });
  
  module.exports ={FbChatbotAttributes};