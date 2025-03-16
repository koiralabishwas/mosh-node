const express = require('express')
const { validateRental } = require('../models/rental')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/' , async (req , res) => {
  if(!req.body.customerId) return res.status(400).send('customerId not found')
  if(!req.body.movieId) return res.status(400).send('movieId not found')
  
  res.status(401).send('Unauthorized')

})

module.exports = router