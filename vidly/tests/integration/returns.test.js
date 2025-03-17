const request = require('supertest')
const mongoose  = require('mongoose')
const { Rental } = require('../../models/rental')
const { User } = require('../../models/user')
const moment = require('moment')
const { Movie } = require('../../models/movie')

describe('/api/returns',() => {
  let server
  
  let customerId 

  let movie
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

    movie = new Movie({
      title: "12345",
      genre: {
        name : "action"
      },
      numberInStock: 2,
      dailyRentalRate: 2
    })

    movieId = movie._id

    rental = new Rental({
      customer : {
        _id : customerId,
        name : "12345",
        phone : "12345"
      },
      movie : movie,
    })
    await movie.save()
    await rental.save()
  })

  afterEach(async () => {
    await server.close()
    await Rental.deleteMany()
    await Movie.deleteMany()
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

  it('should return 404 of no rental found for the customer/movie', async () => {
    await Rental.deleteMany()
    const res = await exec()
    expect(res.status).toBe(404)
  })

  it('sould return 400 if rental already processed' , async () => {
    rental.dateReturned = new Date()
    await rental.save()
    const res = await exec()
    expect(res.status).toBe(400)
  })

  it('should return 200 if request is valid' ,async () => {
    const res = await exec()
    expect(res.status).toBe(200)
  })

  it('should set the returned date if input is valid' ,async () => {
    const res =  await exec()
    const rentalInDb = await Rental.findById(rental._id)
    // here , create a new date and compare the date returned , estimate 10 sec in worst case sinarios
    const diff = new Date() - rentalInDb.dateReturned

    expect(diff).toBeLessThan(10 * 1000)
  })

  it('should calculate the rental fee' , async () => {
    rental.dateOut = moment().add(-7 , 'days').toDate()
    await rental.save()

    const res = await exec()
    const rentalInDb = await Rental.findById(rental._id)

    expect(rentalInDb.rentalFee).toBe(14)
  })

  it('should increase the movie stock',async () => {
    
    const res = await exec()

    const movieInDb = await Movie.findById(movieId)
    expect(movieInDb.numberInStock).toBe(movieInDb.numberInStock + 1)
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
//calculate the rental fee(numberofdays * movie.dailyRentalRate)
//increase the stock
//return the rental