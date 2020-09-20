/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a name is required'],
      maxlength: [40, 'length should be below 40'],
      // validate: [validator.isAlpha, 'alphabets only'],
      select: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, ' provide valid email'],
      select: true
    },
    password: {
      required: true,
      type: String,
      select: false,
      minlength: [8, 'min length should be 8'],
      maxlength: [16, 'max length should be 16']
    },
    passwordConfirm: {
      type: String,
      required: [true, 'password confirm must be provided'],
      select: false,
      validate: {
        validator: function(val) {
          return this.password === val;
        },
        message: 'passwords are not same'
      }
    },
    // photo: {
    //     type: String,
    //     default: 'default.jpg'
    // },
    // dateOfBirth: {
    //     type: Date,
    //     default: Date.now(),
    //     select: false
    // },
    // imagesUploaded: {
    //     type: [String]
    // },
    submittedIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Url'
      }
    ],

    // type: ,
    // set: val => {
    //     return val.map( el => {
    //     const h = el.split('/')[3];
    //     return h;
    //     })
    // }
    points: {
      type: Number,
      default: 0,
      select: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  this.points = 30;
  next();
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('/^find/', async function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  appliedPassword,
  userPassword
) {
  return await bcrypt.compare(appliedPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.pointsIncrease = function(points){
  this.points = this.points + points;
  return points;
};

userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'submittedIds',
    select: '-questions -__v -name'
  });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
