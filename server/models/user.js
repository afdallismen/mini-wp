const mongoose = require('mongoose')

const { isUnique } = require('../helpers/validators').schemaValidators
const { hashPassword, comparePassword } = require('../helpers/auth')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: 'Username can\'t be empty.',
    unique: true,
    match: [/^[a-zA-Z0-9_]*$/, 'Username can only contain alphanumeric and underscore.'],
    validate: {
      validator: function (value) {
        return isUnique(User, this, 'username', value)
      },
      message: props => `User with username ${props.value} is already registered.`
    }
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
    match: [/^[a-zA-Z0-9_]*$/, 'Password can only contain alphanumeric and underscore.'],
    select: false
  },
  email: {
    type: String,
    required: 'Email can\'t be empty.',
    unique: true,
    match: [/[^@]+@[^\.]+\..+/, 'Email is not a valid email.'],
    validate: {
      validator: function (value) {
        return isUnique(User, this, 'email', value)
      },
      message: props => 'User with this email is already registered.'
    }
  }
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password)
  }
  next()
})

userSchema.methods.comparePassword = function (str) {
  return comparePassword(str, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User