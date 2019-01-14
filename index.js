const express = require('express');
const app = express();
const https = require('https');
const http = require('https');
const fs = require('fs');
const apiRoutes =    require('./server/routes/api-routes');
const authRoutes =    require('./server/routes/auth-routes');
const passportSetup = require('./server/config/passport-setup');

const mongoose = require('mongoose');
const config = require('./server/config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
const options = {
    key:fs.readFileSync('adboybots-key.pem'),
    cert:fs.readFileSync('adboybots-cert.pem')
};

// var privacyPolicy = require('./privacyPolicy');



app.use(passport.initialize());


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

//app.use(express.static(path.join(__dirname,"public")));
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(__dirname + '/public/'));

//   // Handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

app.set('view engine', 'html');

app.use(express.static(__dirname + '/adboyBotsClient/dist'));
//app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI,()=>{
    console.log("connected to the database");
})

app.get("/", (req, res) => res.sendFile(__dirname + '/adboyBotsClient/dist/index.html'));
//app.get("/", (req, res) => res.sendFile(__dirname + 'public/index.html'));



app.use('/auth',authRoutes);
//app.use('/api', passport.authenticate('jwt', {session: false}), apiRoutes);
app.use('/api', apiRoutes);


http.createServer(app).listen(8080,function(){
    console.log('https listening on 8080');
});

// app.get('/api/secure',
//   // This request must be authenticated using a JWT, or else we will fail
//   passport.authenticate(['jwt'], { session: false }),
//   (req, res) => {
//     res.send('Secure response from ' + JSON.stringify(req.user));
//   }
// );


https.createServer(options,app).listen(443,function(){
    console.log('https listening on 443');
});



