// socket-server.js --------------------------------------------------------------
const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');

const app   = express();
const server = http.createServer(app);
const io     = new Server(server);

// ---- State that is shared with every client ----
let students  = 0;   // numeric, example: number of active students
let parents   = 0;
let vip       = 0;

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  // When a client asks for the current values, send them back.
  socket.emit('data', {students, parents, vip});

  // ----- Update listeners (anyone can change any field) -----
  socket.on('update-students', val => {
    students = Number(val);
    broadcast({type: 'update-students', value: val});
  });

  socket.on('update-parents',   val => {
    parents  = Number(val);
    broadcast({type: 'update-parents', value: val});
  });

  socket.on('update-vip',       val => {
    vip      = Number(val);
    broadcast({type: 'update-vip',     value: val});
  });
});

// Broadcast a change to **all** connected clients (except the sender)
function broadcast(event, payload) {
  io.emit(event, payload);
}

// Optional – a tiny HTTP endpoint that can be hit with curl/Postman
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

server.listen(3000, () => console.log('🚀 Server listening on http://localhost:3000'));
