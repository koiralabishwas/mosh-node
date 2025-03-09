const request = require('supertest')
const {Genre} = require('../../models/genre');
const { default: mongoose } = require('mongoose');

let server ;

describe('/api/genres',() => {
  //NOTE : a test should be completey resolved inside it . if it populates smth , remember to go bact to initial state
  beforeEach(() => {server = require('../../index')})
  afterEach(async ()=> {
    server.close();
    await Genre.deleteMany({})
  })
  describe('GET /',() => {
    it('should return all genres' ,async () => {
      await Genre.collection.insertMany([
        {name : 'genre1'},
        {name : 'genre2'},
        {name : 'genre3'},
      ])
      const res = await request(server).get('/api/genres')
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(3)
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre3')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre9')).toBeFalsy(); // Check genre9 is NOT present
      console.log(res.body)
    })

    it('should return genre specific genre by id' , async () => {
      const genre = await new Genre({name : "genrez"}).save()
      const res = await request(server).get(`/api/genres/${genre._id}`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name' , genre.name)
      console.log(res.body)
    })

    it('should return 404 if invalid id is passed' , async () => {
      const res = await request(server).get(`/api/genres/${new mongoose.Types.ObjectId().toHexString()}`)
      expect(res.status).toBe(404)
    })
  })
})