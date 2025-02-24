const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req , res) => {
  res.send('hello world')
})

router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  
  const existingUser = await User.findOne({email : req.body.email})
  if (existingUser) return res.status(400).send('User exists')

  const newUser = new User({
    name: req.body.name,
    email : req.body.email,
    password: req.body.password
  })
  
  await newUser.save()
  res.send(newUser)
})

module.exports = router