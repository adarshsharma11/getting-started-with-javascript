var express=require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var new_user=0,pre_user=100;
var user_id,username,message,new_message;

  app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){	
	io.emit('typing', "New user joined the chat room");
	socket.on('chat message', function(msg){
	jsonDecode=JSON.parse(msg);
	
	user_id=jsonDecode.user_id;
	username=jsonDecode.username;
	message=jsonDecode.message;
	new_user=user_id;
	console.log("new user"+new_user+" old user :-"+pre_user);
	if(new_user==pre_user){
		new_message="1";
		
	}else{
		new_message="0";
		
	}
	responseBack='{"user_id":"'+user_id+'","username":"'+username+'","message":"'+message+'","new_message":"'+new_message+'"}';
	
	io.emit('chat message', responseBack);
	presmess=jsonDecode.new_message;
	pre_user=new_user;
	console.log(responseBack);
  });
  socket.on('typing', function(msg){
    io.emit('typing', msg);
	
	
  });
});
//serve port in NodeJs
http.listen(port, function(){
  console.log('listening on *:' + port);
});
