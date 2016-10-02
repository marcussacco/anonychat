//document.addEventListener('DOMContentLoaded', function(){
  var chatWindow = document.getElementById('chatWindow');
  var input = document.getElementById('chatInput');
  var userCount = document.getElementById('userCount');
  var isScrolledToBottom = chatWindow.scrollHeight - chatWindow.clientHeight <= chatWindow.scrollTop + 1;
  var newMessage;
  var socket = io.connect();
  function sender(e){
    if (e.keyCode == 13){
      newMessage = input.value;
      socket.emit('update_chat', {messages: newMessage});
      input.value="";
    }
  }

  socket.on('update_chat', function(data){
    chatWindow.innerHTML += '<p class="userMessage">' + data.messages + '</p>';
    if(isScrolledToBottom){
      chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }
  });

  socket.on('user_count', function(data) {
    if(data.users === 1){
      userCount.innerHTML = 'THERE IS CURRENTLY <span>' + data.users + ' USER</span> IN CHAT';
    }else{
      userCount.innerHTML = 'THERE ARE CURRENTLY <span>' + data.users + ' USERS</span> IN CHAT';
      console.log('A user has connected.');
      console.log(data.users);
    }
  });

  socket.on('user_count', function(data) {
    if(data.users === 1){
      userCount.innerHTML = 'THERE IS CURRENTLY <span>' + data.users + ' USER</span> IN CHAT';
    }else{
      userCount.innerHTML = 'THERE ARE CURRENTLY <span>' + data.users + ' USERS</span> IN CHAT';
      console.log('A user has disconnected.');
      console.log(data.users);
    }
  });


//});
