const path = require('path')
const {Router} = require('express')
const BusinessesController = require('../controllers/businesses')
const OrdersController = require('../controllers/orders')
const UsersController = require('../controllers/users')
const SessionsController = require('../controllers/sessions')


// Define Router Instances
const root = Router()
const businesses = Router()
const orders = Router({mergeParams: true})
const users = Router()
const session = Router()

function authenticate (req, res, next) {
  if (!req.currentUser) {
    res.flash('warning', 'Please Sign In first')
    res.redirect(`/session/new`)
  } else {
    next()
  }
}


/* GET home page. */
root.get('/', function(req, res, next) {
  res.render('./welcome/welcome');
});
businesses.use(authenticate)

//businesses pages
root.use('/businesses', businesses)
businesses.get('/', BusinessesController.index)
businesses.post('/', BusinessesController.create)
businesses.get('/:id/edit', authenticate,  BusinessesController.edit)
businesses.delete('/:id', BusinessesController.destroy)
businesses.patch('/:id', BusinessesController.update)


//orders Routes
businesses.use('/:businessId/orders', orders)
root.use('/businesses', orders)
orders.post('/:businessId/orders',  authenticate, OrdersController.create)
orders.delete('/:businessId/orders/:id', OrdersController.destroy)
orders.patch('/:businessId/orders/:id', OrdersController.update)

// Users Routes
root.use('/users', users)
users.get('/new', UsersController.new)
users.post('/', UsersController.create)


// Session routes
root.use('/session', session)
session.get('/new', SessionsController.new)
session.post('/', SessionsController.create)
session.delete('/', SessionsController.destroy)


module.exports = root;
