var express = require('express');
var app = express();
var http = require('http');
var socketIo = require('socket.io');
var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();

var server = http.createServer(app);
var io = socketIo.listen(server);

var userNum = 0;

server.listen(process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));
console.log('server running');

var chat_history = [];
var clear_all =[];

io.on('connection', function(socket){
  //clear chat for mobile users returning to tab, to avoid dupe messages
  socket.emit('update_chat', {messages: clear_all});
  //show chat history for new user
  for(var i in chat_history){
    socket.emit('update_chat', {messages: chat_history[i]});
  }

  //when a message submits, it's sent to all users
  socket.on('update_chat', function(data){
    chat_history.push(data.messages);
    io.emit('update_chat', {messages: entities.encode(data.messages)});
  });

  socket.on('disconnect', function() {
    userNum -= 1;
    console.log('A user has disconnected.');
    io.emit('user_count', {users: userNum});
  });

  userNum += 1;
  io.emit('user_count', {users: userNum});
  console.log('A new user has connected.');

  var symbols = 'M<M>';
  console.log(entities.encode(symbols));
});
