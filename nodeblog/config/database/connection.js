var mysql = require('mysql');
var Sequelize = require('sequelize');
function connectDatabase(){
  

  var sequelize = new Sequelize('nodeblog', 'root', '', {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
  });
  sequelize
  .authenticate()
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
return sequelize;
}
module.exports=connectDatabase();