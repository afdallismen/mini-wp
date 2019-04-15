const User = require('../../models/user')
const { createToken } = require('../../helpers/auth')

module.exports = {
  findAll: () => User.find(),
  findByUsernameOrEmail: payload => {
    return User.findOne({
      $or: [
        { 'username': payload.login },
        { 'email': payload.login }
      ]
    })
  },
  findById: payload => User.findById(payload.id),
  create: payload => {
    return User.create({
      username: payload.username,
      email: payload.email,
      password: payload.password
    })
    .then(user => ({
      user: { id: user.id, username: user.username, email: user.email },
      token: createToken(user)
    }))
  },
  deleteById: payload => {
    return User
      .findByIdAndDelete(payload.id)
      .then(user => ({
        id: user.id,
        username: user.username,
        email: user.email
      }))
  },
  update: (user, payload) => {
    user.username = payload.username
    user.email = payload.email
    user.$ignore('password')
    return user.save()
  },
  changePassword: (user, payload) => {
    user.password = payload.password
    return user.save()
  }
}