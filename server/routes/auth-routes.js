const router = require('express').Router();
const passport = require('passport');




//route logout with facebook

router.get('/logout',(req,res)=>{
    //handle with passport
    res.cookie('request_adboyBots_token' ,"");
    res.clearCookie("request_adboyBots_token");
    req.logout();
    res.redirect('/');
});

// router.get('/login',(req,res)=>{
//     //handle with passport
//     res.send("login with facebook");
// });

//route auth with facebook

router.get('/facebook',passport.authenticate('facebook',{
   // scope: ['manage_pages','publish_pages','pages_show_list','pages_messaging','pages_messaging_subscriptions']
   scope: ['manage_pages']
}));



router.get('/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
    console.log("callback facebook--->"+req.user);
    if(req.user.isAdboyBotsAdmin)
    {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 60*60*24*365;
        now.setTime(expireTime);
        res.cookie('request_adboyBots_token' ,req.user.tokenAdboyBots);
        res.cookie('user_name' ,req.user.displayName);
        res.cookie('url_img_profile' ,req.user.profilePicUrl);
        res.redirect(`/#/home`);
    }
    else
    {
        res.redirect('/#');
    }

    
});

module.exports =router;

