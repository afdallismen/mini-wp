const { ObjectId } = require('mongoose').Types

const { verifyToken } = require('../helpers/auth')
const { findById } = require('../actions/user')


module.exports = {
  isLoggedIn: (req, res, next) => {
    if ('authorization' in req.headers) {
      try {
        let payload = verifyToken(req.headers.authorization)
        findById(payload)
          .then(user => {
            if (user) {
              req.user = user
              next()
            } else {
              res.status(400).json({ message: 'Invalid token.' })
            }
          })
          .catch(err => res.status(500).json(err))
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(400).json({ message: 'Authentication needed.'})
    }
  },
  isSelf: (req, res, next) => {
    if (ObjectId(req.params.id) === req.user.id) {
      res.status(401).json({ message: 'Unauthorized access.'})
    } else {
      next()
    }
  }
}