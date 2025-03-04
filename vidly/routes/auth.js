const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const Joi = require('joi')
const router = express.Router()
/**
 * No need to implement logout in server
 * simply remove jwt on the client
 */
router.get('/', async (req , res) => {
  res.send('hello world')
})

router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  
  const user = await User.findOne({email : req.body.email})
  if (!user) return res.status(400).send('Invalid user or password')
  
  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (!validPassword) {
    return res.status(401).send("Invalid password")
  }

  const token = user.generateAuthToken()
  res.status(200).send(token)
  
})

function validate(req) {
  const schema = Joi.object({
    email : Joi.string().email(),
    password : Joi.string().required()
  })

  return schema.validate(req)
}
module.exports = router