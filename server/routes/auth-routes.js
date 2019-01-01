const router = require('express').Router();
const passport = require('passport');


//route logout with facebook

router.get('/logout',passport.authenticate('facebook'),(req,res)=>{
    //handle with passport
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
}));



router.get('/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
    console.log("callback facebook--->"+req.user);
    if(req.user.isAdboyBotsAdmin)
    {
        res.redirect('/#/home');
    }
    else
    {
        res.redirect('/#');
    }

    
});

module.exports =router;

