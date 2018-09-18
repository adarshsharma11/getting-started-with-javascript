var connection=require('./connection');
var Sequelize = require('sequelize');


  var user_schema = connection.define('users',{
    email:Sequelize.STRING,
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    password: Sequelize.STRING,
     
  });
    
  var user_schema = connection.define('users',{
    email:Sequelize.STRING,
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    password: Sequelize.STRING,
     
  });
  connection.sync().then(function(){

  });