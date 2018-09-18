
var connection=require('../config/database/connection');
var Sequelize = require('sequelize');


var users=function(){
  var user_schema = connection.define('users',{
    email:Sequelize.STRING,
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    password: Sequelize.STRING,
     
  });
    
  connection.sync().then(function(){

  });


 return{
    insert:function(user){
      var user_insert = user_schema.build(user);
    //Inserting Data into database
    user_insert.save().then(anotherTask => {
   
      // you can now access the currently saved task with the variable anotherTask... nice!
    })
    .catch(error => {
      
      console.log(error);
      // Ooops, do some error-handling
    });
    },
    select:function(data,callback){
      user_schema.findAll({
      where:{email:data.email},
      limit:1,
      }).then(function(user){
         user = user.map(obj => ({ id: obj.id, email: obj.email,password:obj.password }));
        
        callback(null,user);
      });
   
    }
         
    
   


}
  

};
module.exports=users;