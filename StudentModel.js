const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:[4,'min 4 words required'],
        select: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
    

    rollNo:{
        type: Number,
        required: true,
        select: true
    },
    
    subject:{
        type: [String],
        enum: {
            values: ['maths', 'english', 'hindi'],
            message: 'only from the provided values'
        }
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals: true}
});
studentSchema.virtual('gf',{
    type: Number,
    default: 40
}).get( function(){
    return this.rollNo/2;
});

studentSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    console.log(this.password);
    next();
});





studentSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
    ) {
        return await bcrypt.compare(candidatePassword, userPassword);
    };
    
    
    const Student = mongoose.model('Student', studentSchema);
module.exports = Student;