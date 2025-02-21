
const mongoose = require('mongoose')
const express = require('express')
const { Genre } = require('../models/genre')
const { validateMovie, Movie } = require('../models/movie')
const router = express.Router()

router.get('/', async (req , res) => {
  const movies = await Movie.find();
  res.send(movies)
})

router.post('/' , async (req , res) => {
  const {error} = validateMovie(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid Genre')
  
  let movie = new Movie({
    title : req.body.title ,
    genre : {
      id : genre._id,
      name : genre.name
    }, // name
    numberInStock : req.body.numberInStock,
    dailyRentalRate : req.body.dailyRentalRate
  })

  movie = await movie.save();

  res.send(movie)
})

module.exports = router;