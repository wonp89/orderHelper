// ------------------------------------ Index Page ---------------------------------- //

const kx = require('../db/connection')

const businessView = async (currentUser, req, res, next) => {

  try {
    const suppliers = await kx
    .select('users.*')
    .from('users')
    .where({userType: "supplier"})

    const businessSuppliers = await kx
    .select('*', 'users.id as userId')
    .from('users')
    .innerJoin('businessRelationship', 'users.id', 'businessRelationship.supplierId')

    const orders = await kx
    .select()
    .from('orders')
    .innerJoin('users', 'orders.supplierId', 'users.id')

      res.render('businesses/index', {businessSuppliers, orders, suppliers})
    } catch (error) {
      next(error)
    }
}

const supplierView = async (currentUser, req, res, next) => {
  try {

    const businesses = await kx
    .select('*', 'users.id as userId')
    .from('users')
    .innerJoin('businessRelationship', 'users.id', 'businessRelationship.businessId')

    const orders = await kx
    .select()
    .from('orders')
    .innerJoin('users', 'orders.businessId', 'users.id')

      res.render('businesses/supplierIndex', {businesses, orders})
    } catch (error) {
      next(error)
    }
}

const BusinessesController = {

  async index (req, res, next) {
    const {currentUser} = req;

    try {
      if (currentUser.userType == "supplier") {
        await supplierView(currentUser, req, res, next)
      } else {
        await businessView(currentUser, req, res, next)
      }

    } catch (error) {
      next(error)
    }
  },

  //-------------------------------- Show + Edit Page -------------------------------//

  async edit (req, res, next) {
    const {id} = req.params
    const {currentUser} = req;

    try {
      const business = await kx
      .first()
      .from('businessRelationship')
      .where({id})

      const supplier = await kx
      .select()
      .from('businessRelationship')
      .where({supplierId: currentUser.id})
      .innerJoin('users', 'users.id', 'businessRelationship.businessId')

      const businessOrders = await kx
      .select()
      .from('orders')
      .where({businessId: currentUser.id})

      const supplierOrders = await kx
      .select()
      .from('orders')
      .where({supplierId: currentUser.id})

      const supplierRelationship = await kx
      .select('*', 'users.id as userId')
      .from('users')
      .innerJoin('businessRelationship', 'users.id', 'businessRelationship.supplierId')

        res.render('businesses/edit', {business, businessOrders, supplierOrders, supplier, supplierRelationship})
      } catch (error) {
        next(error)
      }
    },

}

module.exports = BusinessesController
