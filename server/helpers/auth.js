const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  createToken: user => jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email
  }, process.env.JWT_SECRET),
  verifyToken: token => jwt.verify(token, process.env.JWT_SECRET),
  hashPassword: pwd => bcrypt.hashSync(pwd),
  comparePassword: (str, hash) => bcrypt.compareSync(str, hash)
}