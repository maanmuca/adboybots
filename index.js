var express = require('express');
var app = express();
//const request = require('request');
//var cron = require('node-cron');
var port = process.env.PORT || 8080;

// var {Chatbot} = require(__dirname+'/server/models/chatbot');
// var {User} = require(__dirname+'/server/models/user');
// var {UserFbPage} = require(__dirname+'/server/models/userFacebookPage');
// var {FacebookPage} = require(__dirname+'/server/models/facebookPage');
// var {TemplatePage} = require(__dirname+'/server/models/templatePage');
// var {Faq} = require(__dirname+'/server/models/faq');
// var {FbAudience} = require(__dirname+'/server/models/facebookAudience');
// var {FbChatbotAttributes} = require(__dirname+'/server/models/facebookChatbotAttributes');
// var privacyPolicy = require('./privacyPolicy');

var bodyParser = require('body-parser');




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

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));



// routes will go here
app.listen(port);
// start the server
//bot.start(5000);

console.log('Server started! At port:' + port);
