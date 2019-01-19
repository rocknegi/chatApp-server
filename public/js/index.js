var socket = io();

socket.on('connect',()=>{
    console.log('connected to server');

});

socket.on('disconnect',()=>{
    console.log('disconnected to server');
});

socket.emit('createMessage',{
    from:'abc@gmail.com',
    text:'yo'
});

socket.on('newMessage',(message)=>{
    console.log('from :',message.from);
})