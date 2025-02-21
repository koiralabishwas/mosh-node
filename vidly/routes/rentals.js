// POST/Get api/rentals
// 

const express = require('express');
const { Rental , validateRental} = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();

router.get('/' ,async (req , res) => {
  const rentals = await Rental.find().sort()
  return res.send(rentals);
})


router.post('/' , async(req , res) => {
  // const {error} = validateRental(req.body)
  // if (error) return res.status(400).send(error)
  
  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(400).send('Invalid Customer')
  
  const movie = await Movie.findById(req.body.movieId)
  if (!movie) return res.status(400).send('Invalid Movie')
  if (movie.numberInStock === 0 ) return res.status(400).send('no movie stock')

  let rental = new Rental({
    customer : {
      _id : customer._id,
      name : customer.name,
      isGold : customer.isGold,
      phone : customer.phone
    },
    movie : {
      _id : movie._id,
      title : movie.title,
      dailyRentalRate : movie.dailyRentalRate
    },
  }) 

  rental = await rental.save()
  movie.numberInStock --;
  movie.save()
  res.send(rental)
})

module.exports = router