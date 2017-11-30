const kx = require('../db/connection')

const BusinessesController = {

  async index (req, res, next) {
    const {currentUser} = req;

    try {
      const businesses = await kx
      .select('businesses.*', 'users.username as username')
      .from('businesses')
      // .where({userId: currentUser.id})
      // .orWhere({business: currentUser})
      .innerJoin('users', 'businesses.userId', 'users.id')

      const orders = await kx
      .select()
      .from('orders')
      // .where({user: currentUser})
      // .orWhere({business: currentUser})
      .innerJoin('businesses', 'orders.businessId', 'businesses.id')
      // .then(data => console.log(data))

        res.render('businesses/index', {businesses, orders})
      } catch (error) {
        next(error)
      }

  },

create (req, res, next) {
    const {business_name, day} = req.body;
    const {currentUser} = req;

    if (typeof business_name === 'string') {
     kx
      .insert({business_name: business_name, day: day, userId: currentUser.id})
      .into('businesses')
      .then(() => res.redirect('/businesses'))
    } else {
      for (let i = 0;i < business_name.length;i++) {
        kx
        .insert({business_name: business_name[i], day: day[i], userId: currentUser.id})
        .into('businesses')
        .then(() => {
        req.flash('success', 'Business Created!')
        res.redirect('/businesses')
        })
      }
    }
  },

  async edit (req, res, next) {
    const {id} = req.params

    try {
      const business = await kx
      .first()
      .from('businesses')
      .where({id})

      const orders = await kx
      .select()
      .from('orders')
      .where({businessId: id})

        res.render('businesses/edit', {business, orders})
      } catch (error) {
        next(error)
      }
    },

    destroy (req, res, next) {
      const {id} = req.params

     kx
       .delete()
       .from('businesses')
       .where({id})
       .then(() => res.redirect('/businesses'))
       .catch(error => next(error))
     },

    update (req, res, next) {
      const {id} = req.params
      const {business_name, day} = req.body
      const business = {business_name, day}

      kx('businesses')
      .update(business)
      .where({id})
      .then(() => res.redirect(`/businesses/${id}/edit`))
      .catch(error => next(error))
    }

}

module.exports = BusinessesController
