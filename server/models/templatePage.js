var mongoose = require('mongoose');

var TemplatePage = mongoose.model('TemplatePage',
{
  facebookPageId:{
      type: String,
      required:true,
      minlength:3,
      trim:true,
      unique: true,
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
            subtitleSection:
                {
                 type: String,
                 required:true,
                 minlength:1,
                 trim:true,
               },
            displayOptions:
                {
                type: Boolean,
                required:true,
              },
            sectionEditable:
                {
                  type: Boolean,
                  required:true,
                },
            preconfigured:
                {
                  type: Boolean,
                  required:true,
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
                  displayAttributesList:
                  {
                    type: Boolean,
                    required:false,
                  },
                  displayAttributesIconList:
                  {
                    type: Boolean,
                    required:false,
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
                      },
                      displaySectionList:
                      {
                        type: Boolean,
                        required:false,
                      },
                      displaySectionListIcon:
                      {
                        type: Boolean,
                        required:false,
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
                      },
                      displaySectionList:
                      {
                        type: Boolean,
                        required:false,
                      },
                      displaySectionListIcon:
                      {
                        type: Boolean,
                        required:false,
                      }
                    }
                  ],
                  elements:
                  [
                    {
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
                      ]
                    }
                  ]
                }
              ]
          }
        ]
      }
    ],
    mySection:
    {
        type: String,
        required:true,
        minlength:1,
        maxlength:80,
        trim:true,
        unique:false
    },
    myRedirectSection:
    {
      type: String,
      required:false,
      minlength:1,
      maxlength:20,
      trim:true
    }
});


module.exports ={TemplatePage};
