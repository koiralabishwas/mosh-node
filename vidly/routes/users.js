const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',async (req , res) => {
  res.send('hello world')
})

router.get('/me', auth ,async (req , res) => {
  // const user = await User.findById(req.user._id).select('-password')

  /**
   * NOTE : if name is set in auth jwt , you can get that withoute over fetching
   */
  res.send(await req.user.name)
})

router.post('/',async (req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  
  const existingUser = await User.findOne({email : req.body.email})
  if (existingUser) return res.status(400).send('User exists')

  const newUser = new User(_.pick(req.body , ['name' , 'email' , 'password']))
  // passwords
  const salt = await bcrypt.genSalt(10)
  newUser.password = await bcrypt.hash(newUser.password , salt)
  await newUser.save();

  const token = newUser.generateAuthToken()
  res.header('x-auth-token' , token).send(_.pick(newUser , ['_id','name' , 'email']))
})

module.exports = router