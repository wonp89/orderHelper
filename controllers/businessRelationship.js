const kx = require('../db/connection')

const BusinessRelationshipController = {

//------------------- Create Relationship ----------------//
supplierList (req, res, next) {
    const {supplierId, day} = req.body;
    const {currentUser} = req;

    kx
     .insert({supplierId: supplierId, businessId: currentUser.id, day, confirm: false, orderChecked: false})
     .into('businessRelationship')
     .then(() => res.redirect('/businesses'))
  },

  // --------------------- Send & Confirm Order ------------------ //
  sendOrder (req, res, next) {
    const {id} = req.params

    kx('businessRelationship')
    .update({confirm: true, orderChecked: true})
    .where({id})
    .then(() => res.redirect('/businesses'))
    .catch(error => next(error))
  },

  confirmOrder (req, res, next) {
    const {id} = req.params

    kx('businessRelationship')
    .update({confirm: false, orderChecked: false})
    .where({id})
    .then(() => res.redirect('/businesses'))
    .catch(error => next(error))
  },

  orderChecked (req, res, next) {
    const {id} = req.params
    console.log({id})

    kx('businessRelationship')
    .update({orderChecked: false})
    .where({id})
    .then(() => res.redirect(`/businesses`))
    .catch(error => next(error))
  },

  // --------------------- Destroy Relationship ------------------ //
destroy (req, res, next) {
      const {id} = req.params

       kx
         .delete()
         .from('businessRelationship')
         .where({id})
         .then(() => res.redirect('/businesses'))
         .catch(error => next(error))
    }
  }

module.exports = BusinessRelationshipController
