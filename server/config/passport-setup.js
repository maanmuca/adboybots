const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./keys');
var {User} = require('../models/user');
const request = require('request');

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
   
            console.log("current User is:"+currentUser);
            done(null,currentUser);
                  
        }
        else
        {
            var requesFBUserDetails = `https://graph.facebook.com/v3.2/${profile.id}/picture?redirect=false`;
            try {

                request.get({url:requesFBUserDetails,json: true}, function (error, response, body)
                {
                    
                    console.log("profile_pic..."+JSON.stringify(response.body.data.url));

                    new User({ facebookId: profile.id, displayName:profile.displayName, isAdboyBotsAdmin:false ,profilePicUrl:response.body.data.url,token:accessToken }).save().then((newUser)=>{
                        console.log("New User Created..."+newUser);
                        done(null,newUser);
                });
                });
                
            } catch (error) {
                console.log("request error-->"+error);
            }
            
           
        }

    }));
  
})
);