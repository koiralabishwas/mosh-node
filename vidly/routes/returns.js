const express = require('express')
const { validateRental, Rental } = require('../models/rental')
const auth = require('../middleware/auth')
const { Movie } = require('../models/movie')
const router = express.Router()
const moment = require('moment')

router.post('/' ,auth, async (req , res) => {
  if(!req.body.customerId) return res.status(400).send('customerId not found')
  if(!req.body.movieId) return res.status(400).send('movieId not found')
  
  const rental = await Rental.findOne({'customer._id' : req.body.customerId , 'movie._id' : req.body.movieId})
  if(!rental) return res.status(404).send('rental not found')

  if(rental.dateReturned) return res.status(400).send('return already processed.')
  
  rental.dateReturned = new Date()
  const rentalDays = moment().diff(rental.dateOut , 'days')
  rental.rentalFee =  rentalDays * rental.movie.dailyRentalRate
  await rental.save()

  await Movie.findByIdAndUpdate(rental.movie._id,{
    $inc : {numberInStock : 1}
  })

  
  

  return res.status(200).send(rental)
})

module.exports = router