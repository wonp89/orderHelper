const kx = require('../db/connection')

const OrdersController = {

  create (req, res, next) {
    const {businessId} = req.params
    const {order_name, quantity, message} = req.body
    const {currentUser} = req
    // const {filename} = req.file;

    kx
      .insert({order_name, quantity, message, businessId, userId: currentUser.id})  // , photo_path: `/uploads/${filename}`
      .into('orders')
      .then(() => res.redirect(`/businesses`))
      .catch(error => next(error))
    },

    destroy (req, res, next) {
      const {id, businessId} = req.params

     kx
       .delete()
       .from('orders')
       .where({id})
       .then(() => res.redirect(`/businesses/${businessId}/edit`))
       .catch(error => next(error))
     },

    update (req, res, next) {
      const {id, businessId} = req.params
      const {order_name, quantity} = req.body
      const order = {order_name, quantity}

      kx('orders')
      .update(order)
      .where({id})
      .then(() => res.redirect(`/businesses/${businessId}/edit`))
      .catch(error => next(error))
    }

}

module.exports = OrdersController
