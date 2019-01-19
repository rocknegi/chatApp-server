const path = require('path');
const express = require('express');
const socketIO  = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const app = express();
var server = http.createServer(app)
var io = socketIO(server);
const port = process.env.PORT || 3000

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected')

    socket.on('disconnect',()=>{
        console.log('disconnected')
    })
});



server.listen(port,()=>{
console.log(`server is up on ${port}`);
})
