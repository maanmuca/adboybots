var express = require('express');
var app = express();
var https = require('https');
var http = require('https');
var fs = require('fs');
const authRoutes =    require('./server/routes/auth-routes');
const passportSetup = require('./server/config/passport-setup');
var mongoose = require('mongoose');
const config = require('./server/config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


var options = {
    key:fs.readFileSync('adboybots-key.pem'),
    cert:fs.readFileSync('adboybots-cert.pem')
};
//const request = require('request');
//var cron = require('node-cron');


// var {Chatbot} = require(__dirname+'/server/models/chatbot');
var {User} = require('./server/models/user');
// var {UserFbPage} = require(__dirname+'/server/models/userFacebookPage');
// var {FacebookPage} = require(__dirname+'/server/models/facebookPage');
// var {TemplatePage} = require(__dirname+'/server/models/templatePage');
// var {Faq} = require(__dirname+'/server/models/faq');
// var {FbAudience} = require(__dirname+'/server/models/facebookAudience');
// var {FbChatbotAttributes} = require(__dirname+'/server/models/facebookChatbotAttributes');
// var privacyPolicy = require('./privacyPolicy');

var bodyParser = require('body-parser');


app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 *1000,
    keys:[config.cookieKey] 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//app.use(express.static(path.join(__dirname,"public")));
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(__dirname + '/public/'));

//   // Handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

app.use(express.static(__dirname + '/public/'));

mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI,()=>{
    console.log("connected to the database");
})

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));




app.use('/auth',authRoutes);

http.createServer(app).listen(8080,function(){
    console.log('https listening on 8080');
});


https.createServer(options,app).listen(443,function(){
    console.log('https listening on 443');
});



