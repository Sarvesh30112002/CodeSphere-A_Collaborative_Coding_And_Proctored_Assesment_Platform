//routes for handling API requests
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roomModal = require('../Model/roomModel');
const userModal = require('../Model/userModel');
require('dotenv').config();

// Join room //handles POST requests to join a room
router.post('/joinroom', (req, res) => {
  const { password, id, username } = req.body;
  roomModal.findById(id, (err, room) => {
    if (err || !room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    if (bcrypt.compareSync(password, room.password)) {  //password matches the room's password using bcrypt.If the password is correct, it generates a JWT token containing the room ID and username, 
      jwt.sign(
        {
          id: room._id,
          username: username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
        (err, token) => {
          if (err) {
            return res.status(500).json({ error: 'JWT signing failed' });
          }
          res.cookie('jwt', token, {
            expires: new Date(Date.now() * 60000),
            httpOnly: true,
          });
          return res.status(200).json({
            status: 200,
            ok: true,
          });
        }
      );
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  });
});

// Delete room //POST requests to delete a room
router.post('/deleteroom', (req, res) => {
  const { id } = req.body;
  roomModal.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Deleting room failed' });
    }
    return res.status(200).json({
      status: 200,
      ok: true,
      data: {
        msg: 'Room deleted successfully',
      },
    });
  });
});

// Create room  //POST requests to create a new room.
router.post('/create', (req, res) => {
  const admincode = Math.random().toString(36).slice(2);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Password hashing failed' });
    }
    const roomData = {
      labname: req.body.labname,
      adminCode: admincode,
      languageId: req.body.language,
      testTimeLimit: req.body.testTimeLimit, // Added test time limit
      questionStatements: req.body.questionStatements // Ensure this is received and stored properly
    };
    const createRoom = new roomModal(roomData);
    createRoom.save()
      .then((doc) => {
        return res.status(200).json({ admincode: doc.adminCode, id: doc._id });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  });
});

// Add question statement //POST requests to add a question to a room.
router.post('/addquestion', (req, res) => {
  const { roomId, questionStatement } = req.body;
  roomModal.findByIdAndUpdate(roomId, { $push: { questionStatements: questionStatement } }, { new: true }, (err, room) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to add question' });
      }
      res.status(200).json({ message: 'Question added successfully' });
  });
});

// Get randomly allotted question
router.get('/getrandomquestion/:roomId', (req, res) => {
  roomModal.findById(req.params.roomId, (err, room) => {
      if (err || !room || !room.questionStatements || room.questionStatements.length === 0) {
          return res.status(404).json({ error: 'No questions found' });
      }
      const randomIndex = Math.floor(Math.random() * room.questionStatements.length);
      const randomQuestion = room.questionStatements[randomIndex];
      res.status(200).json({ question: randomQuestion });
  });
});

// Retrieve questions from the database
router.get('/questions', (req, res) => {
  roomModal.find({}, 'questionStatements', (err, rooms) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error retrieving questions' });
      }
      const questions = rooms.map(room => room.questionStatements).flat();
      res.status(200).json({ questions });
  });
});


// Submit code by a user
router.post('/submitcode', (req, res) => {
  const { username, id, code } = req.body;
  data.save()
    .then((doc) => {
      return res.status(200).send('Code submitted');
    })
    .catch((err) => {
      return res.status(500).send('Code submission failed');
    });
});

// Generate report
router.post('/getcode', (req, res) => {
  const { roomId } = req.body;
  userModal.find({ roomId: roomId }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error occurred while fetching code' });
    }
    return res.status(200).json({
      status: 200,
      data: {
        code: data,
      },
    });
  });
});

module.exports = router;
