const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
var roomModal = require('../Model/roomModel');
require('dotenv').config();
// Middlewares
function queryCheck(req, res, next) {
  if (req.cookies.jwt && req.cookies.jwt !== undefined) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.redirect(`/room/join/${req.params.roomId}`);
      req.user = user;
      next();
    });
  } else {
    return res.redirect(`/room/join/${req.params.roomId}`);
  }
}

function verifyroom(req, res, next) {
  roomModal.findById(req.params.roomId, function (err, roomdata) {
    if (!roomdata) {
      console.log('No room found');
      res.render('404');
    } else {
      req.users = roomdata;
      next();
    }
  });
}

router.get('/joined/:roomId', queryCheck, verifyroom, (req, res) => {
  if (req.user.id === req.params.roomId) {
      // Fetch room details including test time limit
      roomModal.findById(req.params.roomId, (err, room) => {
          if (err || !room) {
              res.render('404');
          } else {

              // Select a random question from the questions array
              const randomIndex = Math.floor(Math.random() * room.questionStatements.length);
              const randomQuestion = room.questionStatements[randomIndex];
              // Render the room.ejs page with test time limit
              res.render('room', {
                  title: 'Room',
                  menuId: 'home',
                  labname: room.labname,
                  by: room.createdBy,
                  language: room.languageId,
                  testTimeLimit: room.testTimeLimit, // Pass test time limit to the template
                  randomQuestion: randomQuestion // Pass the random question to the template
              });
          }
      });
  } else {
      res.redirect(`/room/join/${req.params.roomId}`);
  }
});



module.exports = router;
