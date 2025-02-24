const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true , 
    unique : true
  },
  password : {
    type : String, 
    required : true
  }
}))


function validateUser(user) {
  const schema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required()
  })


  return schema.validate(user)
}

exports.User = User; 
exports.validate = validateUser;