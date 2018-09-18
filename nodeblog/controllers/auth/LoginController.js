var users=require('../../models/users')();
var bcrypt=require('bcrypt-nodejs');
var login=function(req,res,req_data){
  
    var hash = bcrypt.hashSync(req_data.password);
    var userinfo={"email": req_data.email,"password": hash};
    users.select(userinfo,function(err, data){
    if(err)throw err;
    var message;
   if(data.length>0 && bcrypt.compareSync(req_data.password,data[0].password)){
       
        if (!req.session.authdata) {
          req.session.authdata ={}; 
        }
        // req.session.authdata['login_user']=data[0].email;
        req.session.authdata={id:data[0].id,login_user:data[0].email, login_token:data[0].password};
        // req.session.authdata=data[0].email;
        message={type:'success',message:'Login Successfully'};
      }else{
        message={type:'danger',message:'Login Failed'};
      }
     
      res.render("auth/login",{req:req,data:message});
       
    });
    
  }
  module.exports=login;