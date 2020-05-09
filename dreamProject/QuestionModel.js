/* eslint-disable*/
const mongoose = require('mongoose');
const validator = require('validator');

const questionSchema = new mongoose.Schema({
    name: String,
    options:[String],
    answer: String
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
