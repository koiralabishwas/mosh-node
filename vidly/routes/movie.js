
const mongoose = require('mongoose')
const express = require('express')
const { Genre } = require('../models/genre')
const { createMovie, Movie } = require('../models/movie')
const { validate } = require('joi/lib/types/lazy')
const router = express.Router()

router.get('/', async (req , res) => {
  const movies = await Movie.find();
  res.send(movies)
})

router.post('/' , async (req , res) => {
  const {error} = validate(req.body)
})

module.exports = router;