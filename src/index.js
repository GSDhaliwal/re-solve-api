const app = require('express')();
const port = 8080;

const server = app.listen(port, () => {
  console.log('listening on port 8080');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', "server + " + msg);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello 11world</h1>');
});

