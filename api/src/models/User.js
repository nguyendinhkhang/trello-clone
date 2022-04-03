const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    minlength: [3, 'Name Should have More Than 3 Characters'],
    maxLength: [30, 'Name Cannot Exceed 30 Characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a Valid Email']
  },
  username: {
    type: String,
    required: [true, 'Please Enter Your Username'],
    minlength: [6, 'Username Should have More Than 6 Characters'],
    maxLength: [30, 'Username Cannot Exceed 30 Characters'],
    unique: true,
    trim: false
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minlength: [8, 'Password Should have More Than 8 Characters'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: 'sample_id'
    },
    url: {
      type: String,
      required: true,
      default: 'https://res.cloudinary.com/k-ecommerce/image/upload/v1648893507/Trello-Clone/UserAvatar/Profile_jdi4ls.png'
    }
  },
  role: {
    type: Number,
    default: 101
  },
  accountType: {
    type: String,
    required: true,
    default: 'Trello'
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)