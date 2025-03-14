const { default: mongoose } = require("mongoose")
const { User } = require("../../../models/user")
const auth = require('../../../middleware/auth')

describe('auth middleware', () => {
  it('should populate req.user with valid json webtoken', () => {
    const user = {_id : new mongoose.Types.ObjectId().toHexString() , isAdmin : true}
    const token = new User(user).generateAuthToken()
    const req = {
      header : jest.fn().mockReturnValue(token)
    }
    const res = {}
    const next = jest.fn()
    
    auth (req , res , next)

    expect(req.user).toMatchObject(user)
  })
} )