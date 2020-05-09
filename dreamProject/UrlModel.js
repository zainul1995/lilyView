/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const urlSchema = new mongoose.Schema({
    name: {
        type:String,
        // required: [true, 'a name is required'],
        maxlength: [40, 'length should be below 40'],
        // validate: [validator.isAlpha, 'alphabets only'],
        select: true
    },
    submittedVideoIds: {
        type: String,
        required:[true, 'links are required'],
    },
    questions: {
        type: [String]
    },
    time: {
        type: Number
    },
    recommended: {
        type: Boolean,
        default: true

    },
    recommendedNos :{
        type: Number,
        default: 0
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals: true}
});

urlSchema.pre('save', async function(next) {
    this.submittedVideoIds = this.submittedVideoIds.split('/')[3];
    next();
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;