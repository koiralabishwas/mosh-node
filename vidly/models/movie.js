const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

// const movieSchema = new mongoose.Schema({

// })

const Movie = mongoose.model('Movie' , new mongoose.Schema({
  title : {
    type : String,
    required : true , 
    trim : true , 
    minlength : 5,
    maxlength : 255,
  },
  genre : {
    type : genreSchema,
    required : true ,
  },
  numberInStock : {
    type : Number,
    required : true,
    min : 0,
    max : 255,
  },
  dailyRentalRate : {
    type : Number , 
    required : true,
    min : 0,
    max : 255
  }
}))

function validateMovie(movie) {
  const schema = {
    title : Joi.string().min(5).max(50).required(),
    genreId : Joi.string().required(),
    numberInStock : Joi.number().min(0).required(),
    dailyRentalRate : Joi.number().min(0).required()
  }

  return Joi.validate(movie , schema)
}

async function createMovie(name , genres , numberInStock , dailyRentalRate){
  const movie = new Movie({
    name,
    genre : genres,
    numberInStock,
    dailyRentalRate,
  })

  const result = await movie.save()
  console.log(result)
}

exports.createMovie = createMovie
exports.validateMovie = validateMovie
exports.Movie = Movie