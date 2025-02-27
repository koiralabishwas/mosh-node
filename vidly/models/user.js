const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id : this._id} , config.get('jwtPrivateKey'))
  return token 
}
const User = mongoose.model('User', userSchema)



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