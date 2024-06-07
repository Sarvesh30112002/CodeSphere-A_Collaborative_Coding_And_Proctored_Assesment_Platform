const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  labname: {
    type: String,
    required: [true, 'A room must have a name'],
  },
  adminCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  password: {
    type: String,
    minlength: [
      3,
      'A password should be greater than or equal to three characters',
    ],
  },
  createdBy: {
    type: String,
    required: [true, 'A room must have a By'],
  },
  languageId: {
    type: Number,
  },
  testTimeLimit: {
    type: Number, // in minutes
    required: [true, 'A room must have a test time limit'],
  },

  questionStatements: [{
    type: String,
    required: true
}]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
