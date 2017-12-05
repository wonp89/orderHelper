const kx = require('../db/connection')

const OrdersController = {

  create (req, res, next) {
    const {supplierId} = req.params
    const {order_name, quantity, message} = req.body
    const {currentUser} = req

    kx
      .insert({order_name, quantity, message, supplierId, businessId: currentUser.id })
      .into('orders')
      .then(() => res.redirect(`/businesses`))
      .catch(error => next(error))
    },

  destroy (req, res, next) {
      const {id, supplierId} = req.params

     kx
       .delete()
       .from('orders')
       .where({id})
       .then(() => res.redirect(`/businesses/${supplierId}/edit`))
       .catch(error => next(error))
     },

  update (req, res, next) {
      const {id, supplierId} = req.params
      const {order_name, quantity} = req.body
      const order = {order_name, quantity}

      kx('orders')
      .update(order)
      .where({id})
      .then(() => res.redirect(`/businesses/${supplierId}/edit`))
      .then(d => console.log(d))
    }

}

module.exports = OrdersController
