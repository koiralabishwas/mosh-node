const express = require('express')
const { validateRental, Rental } = require('../models/rental')
const auth = require('../middleware/auth')
const { Movie } = require('../models/movie')
const router = express.Router()
const Joi = require('joi')
const validate = require('../middleware/validate')
Joi.objectId = require('joi-objectid')(Joi)


router.post('/' ,[auth,validate(validateReturn)], async (req , res) => {
  const rental = await Rental.lookup(req.body.customerId , req.body.movieId)
  if(!rental) return res.status(404).send('rental not found')

  if(rental.dateReturned) return res.status(400).send('return already processed.')
  
  rental.return()

  await rental.save()

  await Movie.findByIdAndUpdate(rental.movie._id,{
    $inc : {numberInStock : 1}
  })
  return res.send(await rental)
})

function validateReturn(req) {
  const schema = Joi.object({
    customerId : Joi.objectId(),
    movieId : Joi.objectId()
  })

  return schema.validate(req)
}

module.exports = router