const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId = require('joi-objectid')(Joi)

const Rental = mongoose.model('Rental' ,{
  customer:{
    type : new mongoose.Schema({
      name : {
        type : String ,
        required : true,
        minlength : 5 , 
        maxlength : 255
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
    }),
    required : true 
  },
  movie : {
    type : new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }
    }),
    required : true
  },
  rentedDate : {
    type : Date,
    required : true,
    default : Date.now()
  },
  returnedDate : {
    type : Date
  },
  rentalFee : {
    type : Number,
    min : 0
  }
} )

function validateRental(rental) {
  const schema = {
    customerId : Joi.objectId().required(),
    movieId : Joi.objectId().required()    
  }
  return Joi.validate(rental , schema)
}

exports.Rental = Rental
exports.validateRental = validateRental