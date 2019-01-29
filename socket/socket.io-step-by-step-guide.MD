# Build some amazing Real-Time projects with Socket.io
socket.io-step-by-step-guide is documention about how you can integrate socket.io in your upcoming project.You can build various kind of real-time projects with socket programming like Chat Rooms,Messaging application and also you can integrate socket in your IOT Projects.

It is Open Source step by step guide written by **SkyRockets Community** of Developers

# Why you need socket in your projects
+ Socket.io enables real-time bidirectional event-based communication.
+ Socket.io event based library,which helps you to reduce your API load,because if you do hard coding to achive real-time in your project than you need to call API Every second. 
+ You can build various types of real-time application with socket.io.
+ Socket.io is easy to learn and easy to integrate based library.

# How to use socket.io on your project
+ You need to install Node.js and  Npm on your computer or any web server.
+ create a file **socket.js** on your computer
+ Check Following Socket code.
```
var app = require('express')();
var req = require('request');
var fs = require('fs');

var bodyParser = require('body-parser');

// options for SSL certificate. 
var options = {
  key: fs.readFileSync('certs/private.pem'),
  cert: fs.readFileSync('certs/cert.pem')
};
var server = require('https').createServer(options,app);
var io = require('socket.io')(server);


// parse json and parameters for express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Link of the website
const website="http://yourwebsite.com/";
	
  app.get('/',function(request, response){

  });
      // Send new notification to the user
      app.post('/listNotification', function(request, response) {
    
       		req.post({url:website+'api/v1/listNotifications', form: {user_id: request.body.user_id, access_token: request.body.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                     		body=JSON.parse(body);
                        console.log("Socket is sending new notification");    
                        io.sockets.in(request.body.user_id).emit('listNotifications', body);

                
                    response.send({"data":"success"});
                    }); 
          
      });	

      // Send new Offers to the user
      app.post('/listOffers', function(request, response) {
          req.post({url:website+'api/v1/listOffers', form: {user_id: request.body.user_id, access_token: request.body.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                        body=JSON.parse(body);
                        io.sockets.in(request.body.user_id).emit('listOffers', body);
                         response.send({"data":"success"});
                    });        
      }); 
    
      // Send new Offers to the user
      app.post('/listProxies', function(request, response) {
          req.post({url:website+'api/v1/listProxies', form: {user_id: request.body.user_id, access_token: request.body.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                        body=JSON.parse(body);
                        io.sockets.in(request.body.user_id).emit('listProxies', body);
                         response.send({"data":"success"});
                    });        
      }); 

      //Whenever someone connects this gets executed

      io.on('connection', function(socket) {
          console.log('A user connected '+socket);

        // Whenever someone join 
        socket.on('join', function (data){
              socket.join(data.user_id);     
              console.log('A user connected '+data.user_id);             
        });
        
        // Whenever someone fetch notification through sockets
        socket.on('getNotifications',function(data){
          req.post({url:website+'api/v1/listNotifications', form: {user_id: data.user_id, access_token: data.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                    body=JSON.parse(body);
                    io.sockets.in(data.user_id).emit('listNotifications', body);
                });    
        });
        
        // Whenever someone fetch offers through sockets
        socket.on('getOffers',function(data){
          req.post({url:website+'api/v1/listOffers', form: {user_id: data.user_id,product_id:data.product_id,item_count:data.item_count, access_token: data.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                    body=JSON.parse(body);
                    console.log("Offers data send");
                    io.sockets.in(data.user_id).emit('listOffers', body);
                });    
        });
        
        // Whenever someone fetch proxies through sockets
        socket.on('getProxies',function(data){
          req.post({url:website+'api/v1/listProxies', form: {user_id: data.user_id,product_id:data.product_id,item_count:data.item_count,access_token: data.access_token, appSecret: 'Pr0xy33d*' , appVersion: '1.1'} , headers: {} }, function(err,httpResponse,body){ 
                    body=JSON.parse(body);
                    console.log("Proxy data send");
                    io.sockets.in(data.user_id).emit('listProxies', body);
                });    
        });

      // Whenever someone disconnects this piece of code executed
         socket.on('getSocketStatus', function (socket) {
            console.log('A user disconnected '+socket);
         });
         // Whenever someone disconnects this piece of code executed
         socket.on('disconnect', function (socket) {
            console.log('A user disconnected '+socket);
         });
      }); 


//Start socket server
server.listen(3000, function() {
   console.log('listening on *:3000');
});
``` 
+ When you have with the code part than save the file.
+ Now you need to install forever.js package to run socket for forever.
 ```
npm install forever -g 
```
+ After installing forever package globally,now you need to execute your socket file for forever
 ```
forever start socket.js 
```
+ Now everthing is done,whenever you will change your will restart forever.
 ```
forever stop socket.js
forever start socket.js
 ```
	or 
```
forever restart socket.js
```

