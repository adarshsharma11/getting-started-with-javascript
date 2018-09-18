var users=require('../../models/users');
var moment = require('moment');
var bcrypt=require('bcrypt-nodejs');
var signup=function(req,res,req_data){
  var created_at=moment().format('MMMM Do YYYY, h:mm:ss');
  var updated_at=moment().format('MMMM Do YYYY, h:mm:ss');
  var hash = bcrypt.hashSync(req_data.password);
  var userinfo={"email":req_data.email,"first_name":req_data.first_name,"last_name":req_data.last_name,"password":hash};
    var x=users();
    x.select(userinfo,function(err, data){
    if(data.length>0){
      var data={type:'danger',message:'Email address is already exists.'};
      res.render("auth/signup",{req:req,data:data});
    }else{
      x.insert(userinfo);
      var data={type:'success',message:'Account Created Successfully'};
    res.render("auth/signup",{req:req,data:data});
    }
    });
   
    
}
module.exports=signup;
 

