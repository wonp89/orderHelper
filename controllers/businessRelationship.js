const kx = require('../db/connection')

const BusinessRelationshipController = {

supplierList (req, res, next) {
    const {supplierId, day} = req.body;
    const {currentUser} = req;

    kx
     .insert({supplierId: supplierId, businessId: currentUser.id, day})
     .into('businessRelationship')
     .then(() => res.redirect('/businesses'))
  },

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
