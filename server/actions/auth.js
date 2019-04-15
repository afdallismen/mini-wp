const { createToken } = require('../helpers/auth')
const { findByUsernameOrEmail } = require('./user')

module.exports = {
  login: payload => {
    return findByUsernameOrEmail(payload)
      .select('+password')
      .then(user => {
        if (user && user.comparePassword(payload.password)) {
          return {
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            },
            token: createToken(user)
          }
        } else {
          return Promise.reject({ message: 'Credentials or password given is wrong' })
        }
      })
  }
}