const request = require('supertest')
const { Genre } = require('../../models/genre')
const { User } = require('../../models/user')
let server = require('../../index')
describe('auth middleware',() => {
  beforeEach(() => {server = require('../../index')})
  afterEach(async () => {
    await Genre.deleteMany({});
    server.close(); 
    token = new User().generateAuthToken()
  })
  let token;
  const exec = async () => {
    return request(server).post('/api/genres')
    .set('x-auth-token' , token)
    .send({name : 'genre1'})
  }
  
  it('should return 401 if no token in provided',async () => {
    token = ''
    const res = await  exec()
    expect(res.status).toBe(401)
    
  })
  it('should return 400 if invalid token',async () => {
    token = '213123123'
    const res = await  exec()
    expect(res.status).toBe(400)
    
  })
  it('should return 200 if invalid token',async () => {
    const res = await  exec()
    expect(res.status).toBe(200)
  })
})