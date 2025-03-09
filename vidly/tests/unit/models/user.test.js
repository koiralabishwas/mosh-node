const jwt = require('jsonwebtoken')
const {User} = require('../../../models/user')
const config = require('config')
const { default: mongoose } = require('mongoose')
describe('generateAuthToken' , () => {
  it('should return jwt auth token' , () => {
    const payload = {
      _id : new mongoose.Types.ObjectId().toHexString(), // to hex string to make it string
      name : "Bishwas" , 
      email : "example@email.com" ,
      password : "Password" ,
      isAdmin : false
    }
    const user = new User(payload)
    const token = user.generateAuthToken()
    const decoded = jwt.verify(token , config.get('jwtPrivateKey'))
    expect(decoded).toMatchObject({_id : payload._id, name : payload.name , isAdmin : payload.isAdmin})
  })
})