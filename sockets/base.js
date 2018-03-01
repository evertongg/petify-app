module.exports = function (io) {
  io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
      io.sockets.emit('new message', data);
    });
  });

  $(document).ready(() => {
    let socket = io.connect();
    let $messageForm = $('#send-message');
    let $messageBox = $('#message');
    let $chat = $('#chat');

    $messageForm.submit(function(e) {
      e.preventDefault();
      socket.emit('send message', $messageBox.val());
      $messageBox.val('');
    });

  socket.on('new message', function(data) {
    $chat.append(data + '<br/>');
  });

  });
};
