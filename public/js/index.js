var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  // console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);

  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>')
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextbox.val()
  }, () => {
    messageTextbox.val('');
  });
});

var locationButon = jQuery('#send-location');
locationButon.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geo Location is not uspported on this browser');
  }

  locationButon.attr('disable', 'disabled').text('sending location..');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButon.removeAttr('disable').text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButon.removeAttr('disable').text('send location');
    alert('unable to fetch location');
  })
})