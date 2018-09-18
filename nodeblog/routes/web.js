
var bodyParser = require('body-parser');
var postcontroller=require('../controllers/PostController')();


// var multer  = require('multer')();

var urlencodeddata=bodyParser.urlencoded({ extended: false });
module.exports=function(app,path){
    app.get('/',function(req,res){
        postcontroller.home_post(req,res,"show data");
        
    });
    app.get('/latestpost',function(req,res){
        postcontroller.latest_post(req,res,"show data");
        
    });
    app.get('/login',function(req,res){
        res.render("auth/login",{req:req});
    });
    app.post('/login',urlencodeddata,function(req,res){
        var data=req.body;
        var login=require('../controllers/auth/LoginController');
        login(req,res,data);
    });
    
    app.get('/signup',function(req,res){
        res.render("auth/signup",{req:req});
        });
   app.post('/signup',urlencodeddata,function(req,res){
      var data=req.body;
       var signup=require('../controllers/auth/SignupController');
       signup(req,res,data);   
   });
   app.get('/contact',function(req,res){
  
    res.render("contact",{req:req,data:''});
    
});
   app.get('/logout',function(req,res){
    req.session.destroy();
    return res.status(200).redirect("/");
   });



   //
  
   function checkSignIn(req, res,next){
    if(req.session.authdata){
       return next();    //If session exists, proceed to page
    } else {
       res.status(200).redirect("/login");
      
  
    }
 }

 
 app.post('/createpost',urlencodeddata,function(req,res){
    var data=req.body;
    console.log(data);
   
    postcontroller.create_post(req,res,data);  
    return res.render("users/create_post",{req:req});
});
   app.get('/createpost',function(req,res){
   
    return res.render("users/create_post",{req:req})
   });

};