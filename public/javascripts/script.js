let socket = io();
let changeEvent;

// Editor Setup
const textinput = document.getElementById('code');

let mode;


// Change came from admin side

socket.on('adminsidedata', function (user, changeObj) {
  editor.display.input.blur();
  if (username === user && changeEvent) {
    editor.replaceRange(
      changeObj.text,
      changeObj.from,
      changeObj.to,
      'Broadcast'
    );
  }
});
editor.on('blur', () => {
  changeEvent = true;
});
socket.on('delete-roomadmin', function (roomId) {
  let id = window.location.toString().split('room/joined/')[1];
  if (id === roomId) {
    tata.warn('Room', 'Oops! Room is deleted by admin', {
      animate: 'fade',
      position: 'tm',
    });
    setInterval(() => {
      window.location.replace('/');
    }, 3001);
  }
});

// Send ide data to admin

socket.on('personal-ide', function (name) {
  socket.emit('getidedata', editor.getValue(), username);
});

// Your change
editor.on('focus', () => {
  changeEvent = false;
});

editor.on('change', (editor, changeData) => {
  if (changeEvent === false) {
    socket.emit('userdochange', changeData, username);
  }
});

socket.on('connect', function () {
  socket.emit(
    'createroom',
    window.location.toString().split('room/joined/')[1],
    username
  );
});

document.getElementById('submitcode').addEventListener('click', () => {
  console.log('code Submitted');
  let id = window.location.toString().split('room/joined/')[1];
  let code = editor.getValue();
  axios
    .post('/api/v1/submitcode', {
      code,
      id,
      username,
    })
    .then((res) => {
      tata.success('Submit', 'Your Code is Submitted successfully!', {
        animate: 'fade',
        position: 'tm',
      });
      setInterval(() => {
        window.location.replace('/');
      }, 3001);
    })
    .catch((err) => {
      tata.error('Submit', 'Oops! Some Error Occurred', {
        animate: 'fade',
        position: 'tm',
      });
    });
});
