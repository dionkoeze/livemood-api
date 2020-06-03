const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');

server.listen(process.env.PORT || 3000);

app.post('/auth', (req, res) => {
  const token = jwt.sign(
  {
    id: Math.random(),
  }, 
  process.env.SECRET || 'superSecret', 
  {
    expiresIn: 10*60 * 60,
  });

  res.status(200).cookie('identity', token, {httpOnly: true, secure: true}).send("You're authenticated!");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('hello', 'hi there!');
  socket.on('msg', (data) => {
    console.log(data);
    console.log(socket.request.headers.cookie);
  });
});