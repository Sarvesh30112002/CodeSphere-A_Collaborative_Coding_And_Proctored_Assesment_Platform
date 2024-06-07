var usernames = {};
var rooms = [];
var roomAd = {};

module.exports.sock = (server) => {
  const socket = require('socket.io');
  const options = {
    maxHttpBufferSize: 5e7,  // max http buffer size is 50mb
  };  // instance of socket io is created
  const io = socket(server, options);
  io.sockets.on('connection', (socket) => {
    function updateuser(roomId) {
      let x = roomAd[roomId];
      let arr = [];
      if (x !== undefined) {
        x.forEach((ele) => {
          arr.push(usernames[ele]);
        });

        io.emit('update', arr, roomId);
      }
    }   
    // EVENT HANDLERS
    socket.on('change-user', (username) => {
      function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
      }
      let socketid = getKeyByValue(usernames, username);

      io.sockets.in(socketid).emit('personal-ide', username);
    });
    socket.on('getidedata', function (text, user) {
      io.emit('adminsideide', text, user);
    });
    socket.on('delete-room', (roomId) => {
      rooms = rooms.filter((ele) => ele === roomId);
      io.emit('delete-roomadmin', roomId);
    });

    socket.on('createroom', (roomId, username) => {
      socket.username = username;
      socket.room = roomId;
      usernames[socket.id] = username;
      socket.join(roomId);
      if (!rooms.find((ele) => ele === roomId)) {
        rooms.push(roomId);
        roomAd[roomId] = [socket.id];
      } else {
        roomAd[roomId].push(socket.id);
      }
      updateuser(roomId);


      socket.on('page-visibility-change', (visibility) => {
        const username = usernames[socket.id];
        const roomId = socket.room;
    
        let action;
        if (visibility === 'hidden') {
          action = 'switched the Window/Tab';
        } else {
          action = 'is back on Page';
        }
    
        // Log the visibility change or notify admin
        console.log(`User ${username} in room ${roomId} ${action}`);

        io.emit('visibility-change', { username, roomId, action });
    
        // You can also send a notification to the admin using socket.emit
        // socket.emit('visibility-change-notification', { username, roomId, visibility, action });
      });

      
    });
  });
};
