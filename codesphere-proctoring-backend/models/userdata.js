const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = Schema({
    id:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
})

module.exports = Image = mongoose.model('userdata', imageSchema);