
var connection=require('../config/database/connection');
var Sequelize = require('sequelize');
var users=require('./users')();

var posts=function(){
  var post_schema = connection.define('post',{
    userid:Sequelize.INTEGER,
    title:Sequelize.STRING,
    data:Sequelize.STRING,
    image:Sequelize.STRING,
     
  });
  var user_schema = connection.define('users',{
    email:Sequelize.STRING,
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    password: Sequelize.STRING,
     
  });
  user_schema.hasMany(post_schema, {foreignKey: 'userid'})
  post_schema.belongsTo(user_schema, {foreignKey: 'userid'})
  
 
  connection.sync().then(function(){

  });


 return{
    insert:function(post){
      var post_insert = post_schema.build(post);
          post_insert.save().then()
          .catch(error => {
           console.log(error);
    });
    },
    select:function(callback){
      post_schema.findAll({
        include: [{
          model: user_schema,
          
         }],
         
      }).then(posts => {
      //  console.log(posts.user);
        posts = posts.map(obj => ({ id: obj.id,email:obj.user.email,first_name:obj.user.first_name,last_name:obj.user.last_name,title:obj.title,data:obj.data,image:obj.image }));
      //  console.log(posts.users);
        callback(posts);
      });
   
    },
    selectresent:function(callback){
      post_schema.findAll({
        include: [{
          model: user_schema
         }],
         order:Sequelize.literal('id DESC'),
        
         
      }).then(posts => {
      //  console.log(posts.user);
        posts = posts.map(obj => ({ id: obj.id,email:obj.user.email,first_name:obj.user.first_name,last_name:obj.user.last_name,title:obj.title,data:obj.data,image:obj.image }));
      //  console.log(posts.users);
        callback(posts);
      });
   
    },
         
    
   


}
  

};
module.exports=posts;