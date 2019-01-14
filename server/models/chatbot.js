var mongoose = require('mongoose');

var Chatbot = mongoose.model('Chatbot',{
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
    required:false,
    minlength:3,
    trim:true,
    unique: false
  },
  bussinesName:{
    type: String,
    required:false,
    minlength:3,
    trim:true
  },
  category:{
    type: String,
    required:false,
    minlength:3,
    trim:true
  },
  email:{
    type: String,
    required:false,
    //minlength:3,
    trim:true,
    unique: false
  },
  contactNumber:{
    type:String,
    required:false,
  },
  address:
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
  postcode:
  {
    type: String,
    required:false,
    //minlength:3,
    trim:true
  },
  aboutUs:{
    type: String,
    required:false,
    //minlength:10,
    trim:true
  },
  openingHours:[
    {
      day:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      openingTime:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      closingTime:
      {
        type: String,
        required:true,
        minlength:5,
        trim:true
      },
      dayOpen:Boolean,
    }
  ],
  
  categories:[
    {
      categoryName:{
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      categoryIsEditable:Boolean,
      dialogDeleteCategory:Boolean,
      panel:[Boolean],
      buttonSelected:{
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      labelCheckboxbutton:{
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      sameButtonAllCategory:Boolean,
      attrEditable:Boolean,
      dialogConfirmDeleteAttribute:Boolean,
      myAttributeText:{
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      posAttributeOnheaders:{
        type: String,
        required:false,
        //minlength:3,
        trim:true
      },
      dialogAddNewAttribute:Boolean,
      dialogChangePropertiesAttributes: Boolean,
      buttonList:[
        {
          type: String,
          required:false,
          //minlength:3,
          trim:true
        }
      ],
      headers: [
        { 
          text: 
          {
          type: String,
          required:false,
          //minlength:3,
          trim:true
          }, 
          value: 
          {
          type: String,
          required:false,
          //minlength:3,
          trim:true
          } ,
          sortable: Boolean,
          align:
          {
          type: String,
          required:false,
          //minlength:3,
          trim:true
          }
        }
      ],
      myRows: [
        // {
        //   title: 
        //   {
        //     type: String,
        //     required:false,
        //     //minlength:3,
        //     trim:true
        //   }, 
        //   value: 
        //   {
        //     type: String,
        //     required:false,
        //     //minlength:3,
        //     trim:true
        //   }
        // }
      ]
  }
  ],


  
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
