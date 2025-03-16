const request = require('supertest')
const mongoose  = require('mongoose')
const { Rental } = require('../../models/rental')
const { User } = require('../../models/user')

describe('/api/returns',() => {
  let server
  let customerId 
  let movieId
  let rental
  let token

  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token',token)
      .send({customerId , movieId})
  }
  beforeEach(async () => {
    server = require('../../index') 

    token = new User().generateAuthToken()
    customerId = new mongoose.Types.ObjectId().toHexString()
    movieId = new mongoose.Types.ObjectId().toHexString()

    rental = new Rental({
      customer : {
        _id : customerId,
        name : "12345",
        phone : "12345"
      },
      movie : {
        _id : movieId,
        title : '12345',
        dailyRentalRate : 2,
      },
    })
    await rental.save()
  })

  afterEach(async () => {
    await server.close()
    await Rental.deleteMany()
  })

  it('should return 401 if client not logged in ' ,async () => {
    token = ''
    const res = await exec()
    expect(res.status).toBe(401)
  })

  it('should return 400 if cutomer Id is not provided',async () => {
    customerId = ''
    const res = await exec()
    expect(res.status).toBe(400)
  })
  it('should return 400 if movie Id is not provided',async () => {
    movieId = ""
    const res = await exec()
    expect(res.status).toBe(400)
  })
})

// POST api/returns

//return 401 if client is not logged in 
// return 400 if customer is not provided
//return 400 if movieId is not provided
//return 404 if no rental found for this customr / movie 
//return 400 if rental already processed
//return 200 if valid request


//処理//
//calculate the rental fee
//increase the stock
//return the rental