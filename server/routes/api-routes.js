const router = require('express').Router();
var mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/keys');
var {User} = require('../models/user');
var {Chatbot} = require('../models/chatbot');
var {FacebookPage} = require('../models/facebookPage');
var {TemplatePage} = require('../models/templatePage');
var {Faq} =  require('../models/faq');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // The secret that was used to sign the JWT
    secretOrKey: config.SECRET_JWT,
    // // The issuer stored in the JWT
    // issuer: config.ISSUER_JWT,
    // // The audience stored in the JWT
    // audience: config.AUDIENCE_JWT,

  };

  passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

router.get('/facebookPages',passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log('req.user'+JSON.stringify(req.user.facebookId));
    let fb_xx = req.user.facebookId;
    FacebookPage.find({'fb_xx':fb_xx},'id_page category_page name_page url_img_page reachable_users reachable_users_week state',function (err, facebookPages) {
    
    res.send(facebookPages);
    });
});


router.get('/facebookPage',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let fbPgId = req.query.fbPgId;
    console.log("Server.."+fbPgId);
    FacebookPage.findOne({id_page: fbPgId}, function(err, fbPage) {
        console.log("Server..fbPage..."+JSON.stringify(fbPage));
      res.send(fbPage);
    });
  });

  router.post('/updateStateFacebookPage',passport.authenticate('jwt', { session: false }),(req,res)=>{
    //var query = { id_page: req.body.fbPgId };
    console.log("query..."+JSON.stringify(req.body));
    FacebookPage.updateOne({id_page:req.body.fbPgId},{ $set: { state: req.body.state }},function(err,page){
        if(err)console.log("error");
        res.send(page);
    } );
});


router.get('/getChatbot',passport.authenticate('jwt', { session: false }),(req,res)=>{
  let fbPgId = req.query.fbPgId;
  Chatbot.findOne({facebookPageId: fbPgId}, function(err, myChatbot) {
    res.send(myChatbot);
  });
});

router.get('/getCategories',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let fbPgId = req.query.fbPgId;
    Chatbot.findOne({facebookPageId: fbPgId},'categories',function(err, categories) {
      res.send(categories);
    });
  });


router.post('/createChatbot',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let chatbot = req.body.chatbot;
    //console.log('chatbot...'+JSON.stringify(chatbot));
    let fb_xx = req.user.facebookId;
    console.log('fb_xx...'+JSON.stringify(fb_xx));
   
    Chatbot.findOne({facebookPageId: chatbot.facebookPageId}, function(err, myChatbot) {
        if (err || myChatbot==null) {
          let newChatbot = new Chatbot({
            facebookPageId:chatbot.facebookPageId,
            fb_xx:fb_xx,
            bussinesName:chatbot.bussinesName,
            category:chatbot.category,
            email:"",
            contactNumber:"",
            address:"",
            city:"",
            state:"",
            postcode:"",
            aboutUs:"",
            openingHours:chatbot.openingHours,
            categories:chatbot.categories
          });
          newChatbot.save().then((chatbot)=>{
              console.log("The new Chatbot..."+chatbot);
              res.send(chatbot);
            },(e)=>{res.status(400).send(e);});
        }
        else
        {
            console.log("The old Chatbot..."+myChatbot);
            res.send(myChatbot);
        }
    });
});

router.post('/saveDetailsChatbot',passport.authenticate('jwt', { session: false }),(req,res)=>{
    Chatbot.updateOne({facebookPageId: req.body.fbPgId},{ $set: { bussinesName:req.body.bussinesName,
    category:req.body.category,
    email: req.body.email,
    contactNumber:req.body.contactNumber,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    postcode:req.body.postcode,
    aboutUs:req.body.aboutUs,
    openingHours:req.body.openingHours
 }}, function(err, myChatbot) {
        if(err)console.log("error");
        console.log("done!");
    });
});




router.get('/getScript',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let fbPgId = req.query.fbPgId;
    console.log("Server.."+fbPgId);
    TemplatePage.findOne({facebookPageId: fbPgId}, function(err, templatePage) {
        console.log("Server..fbPage..."+JSON.stringify(templatePage));
        if (err || templatePage==null) 
        {
            res.send(null);
        }
        else
        {
            res.send(templatePage);
        }
       
    });
  });

  router.get('/getFaqs',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let fbPgId = req.query.fbPgId;
    let templateName = req.query.templateName;
    //console.log("fbPgId..."+fbPgId+"templateName..."+templateName);
    TemplatePage.findOne({templateName:templateName},function(err, myTemplate){
        if (err || myTemplate==null) 
        {
           console.log("Oops no template");
        }
        else
        {
            Faq.findOne({facebookPageId: fbPgId}, function(err, faqsTemplate) {
                console.log("faqsTemplate..."+JSON.stringify(faqsTemplate));
                if (err || faqsTemplate==null) 
                {
                    console.log("Oops no Faqs");
                }
                else
                {

                    res.send(faqsTemplate);
                }
               
            });
        }
       
    });
   
  });
  router.post('/saveFaqs',passport.authenticate('jwt', { session: false }),(req,res)=>{
    //console.log(JSON.stringify("Body request saveFaqs...",req.body));
    console.log("req.body.fbPgId..."+JSON.stringify(req.body.facebookPageId));
    TemplatePage.findOne({facebookPageId: req.body.facebookPageId}, function(err, response) {
        console.log("myTemplatesResponse..."+JSON.stringify(response));
        console.log("req.body.templateName..."+JSON.stringify(req.body.templateName));
        let indexTemplate = response.myTemplates.map(function(e){ return e.templateName}).indexOf(req.body.templateName);
        console.log("indexTemplate..."+JSON.stringify(indexTemplate));      
        let myScripts =[];
        for(var i =0; i<response.myTemplates[indexTemplate].templateSections.length;i++)
        {
         myScripts.push(response.myTemplates[indexTemplate].templateSections[i].sectionName);
        }
        
        Faq.findOneAndUpdate({"templateName": req.body.templateName},
            { "$set": { "facebookPageId": req.body.facebookPageId, "templateName": req.body.templateName,
         "selectedFaq": req.body.selectedFaq, "selectedGroup": req.body.selectedGroup,
         "myScripts":myScripts,"faqs":req.body.faqs,"faqGroup":req.body.faqGroup
        }}).exec(function(err,myFaqs){
                if(err)console.log("error");
                console.log("myFaqs..."+JSON.stringify(myFaqs));
                res.send(myFaqs);
            } );
    
        });
    });

 
        
   

  
router.post('/createScript',passport.authenticate('jwt', { session: false }),(req,res)=>{
    //var query = { id_page: req.body.fbPgId };
    //console.log("query..."+JSON.stringify(req.body));
    let myTemplates = req.body.myTemplates;
    let templateSelected =  req.body.templateSelected;
    //console.log('myTemplates...'+JSON.stringify(myTemplates));
    //console.log('templateSelected...'+JSON.stringify(templateSelected));


    let fbPgId = req.body.fbPgId;
    //console.log('fb_xx...'+fbPgId);
    // let fb_xx = req.user.facebookId;
    // console.log('fb_xx...'+JSON.stringify(fb_xx));
   
    TemplatePage.findOne({facebookPageId: fbPgId}, function(err, myTemplatesResponse) {
        if (err || myTemplatesResponse==null) {
          let newTemplates = new TemplatePage({
            facebookPageId:fbPgId,
            myTemplates:myTemplates,
            templateSelected:templateSelected
          });
          newTemplates.save().then((newTemplatesResponse)=>{
             // console.log("The new Templates---->>>---->>>"+JSON.stringify(newTemplatesResponse));
              let indexTemplate = newTemplatesResponse.myTemplates.map(function(e){ return e.templateName}).indexOf(templateSelected);
              
              let sectionsTemplate =[];
              for(var i =0; i<newTemplatesResponse.myTemplates[indexTemplate].templateSections.length;i++)
              {
                  sectionsTemplate.push(newTemplatesResponse.myTemplates[indexTemplate].templateSections[i].sectionName);
              }
              Faq.findOne({facebookPageId: fbPgId}, function(err, myFaqResponse) {
                  if (err || myFaqResponse==null) {
                    let newFaq = new Faq({
                      templateName:templateSelected,
                      facebookPageId:fbPgId,
                      faqGroupNameSelected:"General",
                      selectedFaq:"Get Started",
                      selectedGroup:0,
                      myScripts:sectionsTemplate,
                      faqs:
                      [
                          {
                              faqName:"Get Started",
                              scriptSelected:"Get Started",
                              tags:[
                                  {text:"Get Started",isOpen:true,isModifiable:false},
                                  {text:"Hello",isOpen:true,isModifiable:true},
                                  {text:"Hi",isOpen:true,isModifiable:true},
                                  {text:"How are you?",isOpen:true,isModifiable:true}],
                              isModifiable:false
                          }
                      ],
                      faqGroup:
                      [
                          {
                              faqGroupName:'General',
                              panel:[true],
                              groupOfFaqs:
                              [
                                  {
                                      isSelected:true,   
                                      faqName:'Get Started',
                                  }
                              ]
                          }
                      ]  
               
                      
                    });
                    newFaq.save().then((newFaq)=>{
                       console.log("The new Faq..."+JSON.stringify(newFaq));
                        res.send(newTemplatesResponse);
                      },(e)=>{res.status(400).send(e);});
                  }
                 
              });

              
            },(e)=>{res.status(400).send(e);});
        }
        else
        {
            TemplatePage.update({facebookPageId:req.body.fbPgId},{ $set: { myTemplates: myTemplates,templateSelected:templateSelected}},function(err){
                if(err){console.log("Error updating..."+err)}
                TemplatePage.findOne({facebookPageId: fbPgId}, function(err, myTemplatesResponse) {
                res.send(myTemplatesResponse);
                });
            } );
            
        }
    });
});




router.post('/saveCategories',passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("categories in server..."+JSON.stringify(req.body.categories));
    Chatbot.updateOne({facebookPageId: req.body.fbPgId},{ $set: { categories:req.body.categories}}, function(err, myChatbot) {
        if(err)console.log("error");
        res.send(myChatbot);
    });
});









module.exports = router;