var mongoose = require('mongoose');

var TemplatePage = mongoose.model('TemplatePage',
{
  facebookPageId:{
      type: String,
      required:true,
      minlength:3,
      trim:true,
      unique: false,
  },
  myTemplates:
    [
      {
        templateName:
        {
          type: String,
          required:true,
          minlength:1,
          trim:true,
        },
      templateSections:
        [
          {
            sectionName:
                {
                  type: String,
                  required:true,
                  minlength:1,
                  trim:true,
                },
                isModifiable:
                {
                  type: Boolean,
                  required:true,
                },
                subtitleSection:
                {
                    type: String,
                    required:false,
                    minlength:1,
                    trim:true,
                },
                payload:
                {
                  type: String,
                  required:false,
                  minlength:1,
                  maxlength:20,
                  trim:true,
                },
             sectionMessages:
              [
                {
                  type:
                  {
                    type: String,
                    required:false,
                    enum: ['simple_text', 'quick_reply', 'button_template', 'gallery_template'],
                    trim:true,
                  },
                  text:
                  {
                    type: String,
                    required:false,
                    minlength:1,
                    maxlength:640,
                    trim:true,
                  },
                  myAttribute:
                  {
                    attributeName:
                    {
                      type: String,
                      required:false,
                      minlength:1,
                      maxlength:80,
                      trim:true,
                    },
                    attributeValue:
                    {
                      type: String,
                      required:false,
                      trim:true,
                    },
                  },
                  quick_replies:[
                    {
                      content_type:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:80,
                        trim:true,
                      },
                      title:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:80,
                        trim:true,
                      },
                      payload:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      }
                    }
                  ],
                  buttons:[
                    {
                      type:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      },
                      title:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      },
                      payload:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      }
                    }
                  ],
                  categorySelected:
                  {
                    type: String,
                    required:false,
                    minlength:1,
                    maxlength:80,
                    trim:true,
                  },
                  myFilters:[
                    {
                      attributeName:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:80,
                        trim:true,
                      },
                      attributeValue:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:80,
                        trim:true,
                      },
                      conditionFilter:
                      {
                        type: String,
                        required:false,
                        minlength:0,
                        maxlength:20,
                        trim:true,
                      },
                    }
                  ],
                  elements:
                  [
                    {
                      imageUrl:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      },
                      title:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:20,
                        trim:true,
                      },
                      subtitle:
                      {
                        type: String,
                        required:false,
                        minlength:1,
                        maxlength:80,
                        trim:true,
                      },
                      buttons:[
                        {
                          type:
                          {
                            type: String,
                            required:false,
                            minlength:1,
                            maxlength:20,
                            trim:true,
                          },
                          title:
                          {
                            type: String,
                            required:false,
                            minlength:1,
                            maxlength:20,
                            trim:true,
                          },
                          payload:
                          {
                            type: String,
                            required:false,
                            minlength:1,
                            maxlength:20,
                            trim:true,
                          },
                        }
                      ], 
                    }
                  ]
                }
              ]
          }
        ]
      }
    ],
  templateSelected:
  {
    type: String,
    required:false,
    minlength:1,
    maxlength:80,
    trim:true,
  }
});


module.exports ={TemplatePage};
