console.log('yo');

$.post("/auth", function(data) {
    console.log(data);
    $('#response').text(data);
    const socket = io.connect('https://livemood-api.herokuapp.com');
    socket.on('hello', (data) => {
      console.log(`from server over socket.io: ${data}`);
      socket.emit('msg', 'hello to you too!');
    });
});