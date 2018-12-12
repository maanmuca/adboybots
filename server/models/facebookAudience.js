var mongoose = require('mongoose');

var FbAudience = mongoose.model('FbAudience',{
    facebookPageId:
    {
        type: String,
        required:true,
        minlength:3,
        trim:true,
        unique: true,
    },
    myFBAudiences:
    [
        {
            fbAudienceName:
            {
                type: String,
                required:false,
                minlength:1,
                trim:true, 
            },
            fbAudienceFilters:
            [
                {
                    attributeNameFBAudience:
                    {
                        type: String,
                        required:false,
                        minlength:1,
                        trim:true,
                    },
                    attributeValueFBAudience:
                    {
                        type: String,
                        required:false,
                        minlength:1,
                        trim:true,
                    },
                    filterFBAudience:
                    {
                        type: String,
                        required:false,
                        enum: ['AND', 'OR', '--'],
                        trim:true,
                    }
                }
            ]

        }
    ]
   
  });
  
  module.exports ={FbAudience};