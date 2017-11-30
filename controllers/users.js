const bcrypt = require('bcrypt')
const kx = require('../db/connection')

const UsersController = {
  new (req, res, next){
    res.render('users/new')
  },
  async create (req, res, next) {
    const {username, email, password, confirmPassword, userType} = req.body

    if (password !== confirmPassword) {
      req.flash('danger', 'Password and confirmation do not match')
      return res.redirect('/users/new')
    }

    try {

      const passwordDigest = await bcrypt.hash(password, 10)


      const [user] = await kx
        .insert({username, email, passwordDigest, userType})
        .into('users')
        .returning('*')

      if (user) {
        req.session.userId = user.id
        req.flash('success', 'Thank you for signing up!')
        res.redirect('/')
      } else {
        req.flash('danger', 'Something went wrong')
        res.redirect('/users/new')
      }

      req.flash('success', 'Thank you for signing up!')
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  }
}


module.exports = UsersController
