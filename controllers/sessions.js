const bcrypt = require('bcrypt')
const kx = require('../db/connection')

const SessionsController = {
  new (req, res, next) {
    res.render('sessions/new')
  },
  async create (req, res, next) {
    const {email, password} = req.body

    try {
      const user = await kx.first().from('users').where({email})

      if (user && await bcrypt.compare(password, user.passwordDigest)) {
        req.session.userId = user.id
        req.flash('success', 'Thank you for signing in!')
        res.redirect('/')
      } else {
        req.flash('danger', 'Incorrect password or email')
        res.redirect('/session/new')
      }
    } catch (error) {
      next(error)
    }
  },
  destroy (req, res, next) {
    req.session.userId = null
    req.flash('success', 'Logged out successfully!')
    res.redirect('/')
  }
}

module.exports = SessionsController
