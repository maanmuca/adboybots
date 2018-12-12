var mongoose = require('mongoose');

var Chatbot = mongoose.model('Chatbot',{
  templateType:{
    type: String,
    required:false,
    minlength:3,
    trim:true,
  },
  businessName:{
    type: String,
    required:true,
    minlength:3,
    trim:true
  },
  aboutUs:{
    type: String,
    required:false,
    //minlength:10,
    trim:true
  },
  location:[
    {
      fullAddress:
      {
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
    city:
      {
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
    state:
      {
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
    zipCode:
      {
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      showFullAddress:Boolean,
    }
  ],
  openingHours:[
    {
      dayOpen:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      openingHour:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      closingHour:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      isOpenDay:Boolean,
    }
  ],
  contactNumber:{
    type:String,
    required:false,
  },
  myCategories:[
    {
    displayTableCategory:Boolean,
    categoryName:
    {
      type: String,
      required:true,
      minlength:1,
      maxlength:40,
      trim:true,
    },
    myProducts:
    [
      {
        title:
        {
          type: String,
          required:true,
          minlength:1,
          trim:true,
        },
        subtitle:
        {
          type: String,
          required:true,
          minlength:1,
          trim:true,
          unique: false,
        },
        image_url:
        {
          type: String,
          required:false,
          //minlength:1,
          trim:true,
          unique: false,
        },
        button:
        {
          title:
          {
            type: String,
            required:true,
            minlength:1,
            trim:true,
            unique: false,
          },
          url:
          {
            type: String,
            required:true,
            minlength:3,
            trim:true,
            unique: false,
          }
        },
      myAttributes:
      [
        {
          attributeType:
          {
            type: String,
            required:false,
            minlength:1,
            maxlength:20,
            trim:true
          },
          attributeValue:
          {
            type: String,
            required:false,
            minlength:1,
            trim:true,
            unique: false,
          }
        }
      ]
    }

    ],
    myServices:
    [
      {
        title:
        {
          type: String,
          required:true,
          minlength:1,
          trim:true,
        },
        subtitle:
        {
          type: String,
          required:true,
          minlength:1,
          trim:true,
          unique: false,
        },
        image_url:
        {
          type: String,
          required:false,
          //minlength:1,
          trim:true,
          unique: false,
        },
        button:
        {
          title:
          {
            type: String,
            required:true,
            minlength:1,
            trim:true,
            unique: false,
          },
          payload:
          {
            type: String,
            required:true,
            minlength:1,
            trim:true,
            unique: false,
          }
        },
      }
    ]
  }
  ],
  myCustomCategories:[
      {
        displayTableCategory:
        {
            type: Boolean,
            required:true,
        },
        categoryName:{
          type: String,
          required:false,
          minlength:1,
          maxlength:40,
          trim:true,
        },
        myCustomItems:[
            {
              title:{
                type: String,
                required:false,
                minlength:1,
                maxlength:80,
                trim:true,
              },
              subtitle:{
                type: String,
                required:false,
                minlength:1,
                maxlength:80,
                trim:true,
              },
              image_url:{
                type: String,
                required:false,
                minlength:1,
                trim:true,
                unique: false,
              },
              button:
                {
                  title:{
                    type: String,
                    required:false,
                    minlength:1,
                    maxlength:20,
                    trim:true,
                  },
                  payload: {
                    type: String,
                    required:false,
                    minlength:1,
                    trim:true,
                  }
                },
                myAttributes:[
                  {
                    attributeType : {
                      type: String,
                      required:false,
                      minlength:1,
                      maxlength:20,
                      trim:true,
                    },
                    attributeValue : {
                      type: String,
                      required:false,
                      minlength:1,
                      trim:true,
                    },
                  }
                ]
            }
          ]
      }
    ],
  attributeName:
  {
    type: String,
    required:false,
    trim:true,
  }
  ,
  facebookPageId:
  {
    type: String,
    required:true,
    minlength:3,
    trim:true,
    unique: true,
  },
  fb_xx:{
    type: String,
    required:true,
    minlength:3,
    trim:true,
    unique: false
  },
  emailChatbot:{
    type: String,
    required:false,
    //minlength:3,
    trim:true,
    unique: false
  }
});

module.exports ={Chatbot};

/*var newChatbot = new Chatbot({
  businessName: 'maanmuca corp',
  serviceType: 'Fullstack web development',
  aboutUs:'Best services ever',
  location:'Unit 104 72-76 High st , Windsor, Victoria',
  services:[{serviceName:'Programming',cta:['Send message','Book Now','Get Quote']},{serviceName:'Web Design',cta:['Send message','Book Now','Get Quote']},{serviceName:'Artificial Inteligence',cta:['Send message','Book Now','Get Quote']}],
  chatbotConfig:{webhook:'https://google.com.au',emailAssociated:['maanmuca@hotmail.com']}
});

newChatbot.save().then((doc)=>{
  console.log('Saved Chatbot ! ! !',doc);
},(e)=>{
  console.log('Unable to save chatbot',e);
});*/
