const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./keys');
var {User} = require('../models/user');
var {FacebookPage} = require('../models/facebookPage');
const request = require('request');
const generateAccessToken = require('./token');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

passport.serializeUser((user,done)=>
{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>
{
    User.findById(id).then((user)=>{
        done(null,user);
    });
    
});



passport.use(new FacebookStrategy({
    callbackURL: config.FB_CALLBACK_URL,
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FB_APP_SECRET,
},(accessToken, refreshToken, profile, done)=>{
    if(User.findOne({facebookId:profile.id}).then((currentUser)=>{

        if(currentUser)
        {
   
           // console.log("current User is:"+currentUser);
            var requestPagesUserTokensIds = `https://graph.facebook.com/v3.0/${profile.id}/accounts?access_token=${accessToken}`;
                        request.get({url:requestPagesUserTokensIds,json: true}, async function (error, response, body)
                        {
                            if(error){console.log("error..."+error)};
                            //console.log('response tokens ...'+JSON.stringify(response));
                            let myfb_id = profile.id;
                            
                            let myData= response.body.data;
                            
                            for(var i = 0; i<myData.length;i++)
                            {
                                let fbPgId =  myData[i].id;
                                let fbPgName =myData[i].name; 
                                let fbPgCategory = myData[i].category;
                                let fbPgTk =  myData[i].access_token;

                                let pageExists = await FacebookPage.findOne({id_page: fbPgId}, function(err, myChatbot) {
                                    if(err || myChatbot==null) return false; else{return true;}
                                    });
                                
                                if(!pageExists)
                                {
                                    getImage(fbPgId,fbPgTk).then(function(image,rejection)
                                    {
                                        if(rejection){console.log(rejection)}
                                        console.log("All info about page..."+JSON.stringify(image));
                                        let fpImgPg = image.body.picture.data.url;
                                        
                                        var myFacebookPage = new FacebookPage(
                                            {
                                                fb_xx: myfb_id,
                                                id_page: fbPgId,
                                                name_page: fbPgName,
                                                category_page:fbPgCategory,
                                                access_token_page:fbPgTk,
                                                url_img_page:fpImgPg,
                                                reachable_users:"--",
                                                reachable_users_week:"--",
                                                state:"notChatbot"
                                            }
                                            );

                                            myFacebookPage.save().then((doc)=>{
                                            
                                            },(e)=>{
                                            res.status(400).send(e);
                                            });
                                    }).catch(e => {
                                    console.log("error getting image here! "+e);
                                    });
                                }
                                
                            }

                            done(null,currentUser);
                          
                        

                        });

            
            
                  
        }
        else
        {
            var requesFBUserDetails = `https://graph.facebook.com/v3.2/${profile.id}/picture?redirect=false`;
            try {

                request.get({url:requesFBUserDetails,json: true}, function (error, response, body)
                {
                    
                    //console.log("profile_pic..."+JSON.stringify(response.body.data.url));
                    let myToken = jwt.sign(profile.id, config.SECRET_JWT);
                   // console.log("token..."+myToken);
                   // console.log("profile.id..."+profile.id);

                    new User({ facebookId: profile.id, displayName:profile.displayName, isAdboyBotsAdmin:false ,profilePicUrl:response.body.data.url,tokenAdboyBots:myToken }).save().then((newUser)=>{
                        //console.log("New User Created..."+newUser);
                        var requestPagesUserTokensIds = `https://graph.facebook.com/v3.0/${profile.id}/accounts?access_token=${accessToken}`;
                        request.get({url:requestPagesUserTokensIds,json: true}, async function (error, response, body)
                        {
                            if(error){console.log("error..."+error)};
                            console.log('response tokens ...'+JSON.stringify(response));
                            let myfb_id = profile.id;
                            
                            let myData= response.body.data;
                            
                            for(var i = 0; i<myData.length;i++)
                            {
                                let fbPgId =  myData[i].id;
                                let fbPgName =myData[i].name; 
                                let fbPgCategory = myData[i].category;
                                let fbPgTk =  myData[i].access_token;

                                let pageExists = await FacebookPage.findOne({id_page: fbPgId}, function(err, myChatbot) {
                                    if(err || myChatbot==null) return false; else{return true;}
                                    });
                                
                                if(!pageExists)
                                {
                                    getImage(fbPgId,fbPgTk).then(function(image,rejection)
                                    {
                                        if(rejection){console.log(rejection)}
                                        //console.log("All info about page..."+JSON.stringify(image));
                                        let fpImgPg = image.body.picture.data.url;
                                        
                                        var myFacebookPage = new FacebookPage(
                                            {
                                                fb_xx: myfb_id,
                                                id_page: fbPgId,
                                                name_page: fbPgName,
                                                category_page:fbPgCategory,
                                                access_token_page:fbPgTk,
                                                url_img_page:fpImgPg,
                                                reachable_users:"--",
                                                reachable_users_week:"--",
                                                state:"notChatbot"
                                            }
                                            );

                                            myFacebookPage.save().then((doc)=>{
                                            
                                            },(e)=>{
                                            res.status(400).send(e);
                                            });
                                    }).catch(e => {
                                    console.log("error getting image here! "+e);
                                    });
                                }
                                
                            }
                                    
                            done(null,newUser);

                        });
                       
                });
                });
                
            } catch (error) {
                console.log("request error-->"+error);
            }
            
           
        }

        function getImage(fbPageId,accessToken)
        {
            
            
            return new Promise((resolve, reject) =>
            {
            var requestPagesUserTokensIds = `https://graph.facebook.com/v3.0/${fbPageId}?fields=picture&access_token=${accessToken}&redirect=false`;
                request.get({url:requestPagesUserTokensIds,json: true}, async function (error, response, body)
                {
                    if(error){console.log("error..."+error); reject("Problems  getting image Page")};
                    resolve(response);
                });
            });
            
        }

        function getData(fbPageId,accessToken)
        {
            
            
            return new Promise((resolve, reject) =>
            {
            var requestPagesUserTokensIds = `https://graph.facebook.com/v3.0/${fbPageId}?fields=picture&access_token=${accessToken}&redirect=false`;
                request.get({url:requestPagesUserTokensIds,json: true}, async function (error, response, body)
                {
                    if(error){console.log("error..."+error); reject("Problems  getting image Page")};
                    resolve(response);
                });
            });
            
        }

        

    }));
  
})
);

