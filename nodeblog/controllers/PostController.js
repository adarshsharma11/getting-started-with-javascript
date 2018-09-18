var post=require('../models/post')();
var moment = require('moment');
// var multer = require('multer');
var fs = require('fs');
// var bcrypt=require('bcrypt-nodejs');

function post_validator(req_data){
var error=[];
if(typeof req_data.title== 'undefined'  || req_data.title==""){
    error.push({name:'title',value:'Title not set'});
}
if(typeof req_data.data== 'undefined' || req_data.data==""){
    error.push({name:'title',value:'data is not set'});
}
if(typeof req_data.image== 'undefined' || req_data.image==""){
    error.push({name:'title',value:'image is not set'});
}
    return error;
}
var postcontroller=function(){

  return{
      create_post:function(req,res,req_data){
        var validationErrors = [];
        req_data.image="";
        if (req.files){
        req_data.image=req.files.image.name;
    }
        validationErrors = post_validator(req_data);
        if(validationErrors.length > 0) {
            console.log(validationErrors);
            return validationErrors;
        }
        req_data.userid=req.session.authdata.id;
        
        if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
        let sampleFile = req.files.image;
        console.log(sampleFile);
        console.log(__dirname);
        sampleFile.mv(__dirname+"/../public/images/"+req.files.image.name, function(err) {
         if (err){
            return res.status(500).send(err);
         }
        });
        post.insert(req_data);
       
   
      },
      home_post:function(req,res,req_data){
        post.select(function(callback_data){
            var posts=[];
        //    callback_data.forEach(function(data){
        //            console.log(data);
        //     });
    //   console.log(callback_data);
            return res.render("home",{req:req,posts:callback_data})
        });
        

      },
      latest_post:function(req,res,req_data){
        post.selectresent(function(callback_data){
            var posts=[];
        //    callback_data.forEach(function(data){
        //            console.log(data);
        //     });
    //   console.log(callback_data);
            return res.render("latestpost",{req:req,posts:callback_data})
        });
        

      }
      
    }

   



}
module.exports=postcontroller;
 

