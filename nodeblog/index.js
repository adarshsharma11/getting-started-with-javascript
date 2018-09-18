var express=require('express');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var fileUpload = require('express-fileupload');

//DECLARE CONNECTION
app.use(fileUpload());
app.use(session({secret: "secret key"}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 3000;

//ADD CONTROLLER TO PAGE
var routes=require('./routes/web.js');




//CallING MYController
routes(app,path);











// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/pages/index.html');
// });
// app.get('/profile/:name', function(req, res){
//   var data=[{name:'rohitjoshi',age:'18 year old'}];
//   res.render("profile",{person:data});
// });
// app.get('/contact', function(req, res){
//   var data=req.query;
//   res.render("contact",{data:data});
// });
// app.post('/contact',urlencodeddata, function(req, res){
//   var greeting={name:req.body.email,message:'Thanks for Contacting us'};
//   res.render("contact",{data:greeting});
// });

http.listen(port, function(){
  console.log('listening on *:' + port);
});
