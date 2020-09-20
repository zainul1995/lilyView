/* eslint-disable*/
const mongoose = require('mongoose');
const validator = require('validator');

const questionSchema = new mongoose.Schema({
    question: String,
    options:[{
        answer: [{
            option: String,
            correct: Boolean
        }]

    }]
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
