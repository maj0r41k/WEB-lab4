const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('user connected', (socket)=> {
        io.emit('user connected', { nickname: socket.nickname});
    });
  
    socket.on('chat message', (data) => {
      io.emit('chat message', { nickname: data.nickname, message: data.message });
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
