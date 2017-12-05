const path = require('path')
const {Router} = require('express')
const BusinessesController = require('../controllers/businesses')
const OrdersController = require('../controllers/orders')
const UsersController = require('../controllers/users')
const SessionsController = require('../controllers/sessions')
const BusinessRelationshipController = require('../controllers/businessRelationship')

//----- Router Defined --------//
const root = Router()
const businesses = Router()
const orders = Router({mergeParams: true})
const users = Router()
const session = Router()
const businessRelationship = Router()

//--------- authenticate setup ----------//
function authenticate (req, res, next) {
  if (!req.currentUser) {
    res.flash('warning', 'Please Sign In first')
    res.redirect(`/session/new`)
  } else {
    next()
  }
}

//------------ GET home page --------------//
root.get('/', function(req, res, next) {
  res.render('./welcome/welcome');
});
businesses.use(authenticate)

//--------- businesses views pages ---------//
root.use('/businesses', businesses)
businesses.get('/', BusinessesController.index)
businesses.get('/:id/edit', authenticate,  BusinessesController.edit)

//--------- orders Routes ----------//
businesses.use('/:supplierId/orders', orders)
root.use('/businesses', orders)
orders.post('/:supplierId/orders',  authenticate, OrdersController.create)
orders.delete('/:supplierId/orders/:id', OrdersController.destroy)
orders.patch('/:supplierId/orders/:id', OrdersController.update)

//--------- Users Routes ---------//
root.use('/users', users)
users.get('/new', UsersController.new)
users.post('/', UsersController.create)

//-------- Session routes --------//
root.use('/session', session)
session.get('/new', SessionsController.new)
session.post('/', SessionsController.create)
session.delete('/', SessionsController.destroy)

//---------- Business Relationship--------//
root.use('/businesses', businessRelationship)
businessRelationship.post('/supplierList', BusinessRelationshipController.supplierList)
businessRelationship.delete('/:id', BusinessRelationshipController.destroy)
//------------- Business Relationship: Confirm -----------//
businessRelationship.patch('/send/:id', BusinessRelationshipController.sendOrder)
businessRelationship.patch('/confirm/:id', BusinessRelationshipController.confirmOrder)


module.exports = root;
