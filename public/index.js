console.log('yo');

$.post("/auth", function(data) {
    console.log(data);
    $('#response').text(data);
    const socket = io.connect('https://livemood-api.herokuapp.com');
    // const socket = io.connect('https://127.0.0.1:3000');
    socket.on('hello', (data) => {
        console.log(`from server over socket.io: ${data}`);
        socket.emit('msg', 'hello to you too!');
        $.post("/auth", function(_) {
            socket.emit('msg', 'second message');
        });
    });
    
});