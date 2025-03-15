const request = require("supertest");
const { Genre } = require("../../models/genre");
const { default: mongoose } = require("mongoose");
const { User } = require("../../models/user");

let server;

describe("/api/genres", () => {
  //NOTE : a test should be completey resolved inside it . if it populates smth , remember to go bact to initial state
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre3")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre9")).toBeFalsy(); // Check genre9 is NOT present
      console.log(res.body);
    });
  });
  describe("GET /:ID", () => {
    it("should return genre specific genre by id", async () => {
      const genre = await new Genre({ name: "genre1" }).save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(
        `/api/genres/${new mongoose.Types.ObjectId().toHexString()}`
      );
      expect(res.status).toBe(404);
    });
  });

  describe("POST /",() => {
    let token;
    let name;
    async function exec(){
      return await request(server)
      .post('/api/genres')
      .set('x-auth-token',token)
      .send({name : name})
    }

    beforeEach( () => {
      token = new User().generateAuthToken();
      name = 'genre1'
    })
    it('should return 401 if not logged in ',async () => {
      token = ''
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return 400 if genre is invalid i.e less than 5 char ',async () => {
      name = new Array(2).join('a')
      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should return 400 if genre is invalid i.e more than 50 char ',async () => {
      name = new Array(52).join('a')
      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should return save the genre if it is valid ',async () => {
      const token = new User().generateAuthToken()
      const res = await exec()
      expect(res.status).toBe(200)
      const genre = Genre.find({name : 'genre1'})
      expect(genre).not.toBeNull()
    })

    it('should return the genre if it is valid',async () => {
      const token = new User().generateAuthToken()
      const res = await exec()
      expect(res.body).toHaveProperty('_id') 
      expect(res.body).toHaveProperty('name','genre1') 
    })
  })

  describe("PUT/:ID", () => {
    let token ;
    let _id;
    async function exec(id , newName){
      return await request(server)
      .put('/api/genres/'+id)
      .set('x-auth-token',token)
      .send({name : newName})
    }
    beforeEach(async () => {
      token = new User().generateAuthToken();
      const initialGenre = await new Genre({name : 'oldName'}).save()
      _id = initialGenre._id
    })
    it('should return error if invalid jwt',async () => {
      token = "";
      const res = await exec(_id , 'newName')
      expect(res.status).toBe(401);
    })

    it('should return error if genreId is notGiven' , async () => {
      _id = ''
      const res = await exec(_id , 'newName')
      expect(res.status).toBe(404)
    })

    it('should return error if genreId is not found' , async () => {
      _id = new mongoose.Types.ObjectId().toHexString()
      const res = await exec(_id , 'newName')
      expect(res.status).toBe(404)
    })
    it('should change the name if it is valid ',async() => {
      const name = 'newName'
      const res = await exec(_id , name)
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('newName')
    })
  })

  describe('DELETE/:ID' , () => {
    let token ;
    let _id;
    async function exec(id){
      return await request(server)
      .delete('/api/genres/'+id)
      .set('x-auth-token',token)
      .send()
    }

    beforeEach(async () => {
      const initialGenre = await new Genre({name : 'oldName'}).save()
      const initialUser = new User({
        name: "test user",
        email: "example@gmail.com",
        password: "123456",
        isAdmin: true
      })
      token = initialUser.generateAuthToken();
      genreId = initialGenre._id
    })
    it('should return error if not authorized',async () => {
      token = "";
      const res = await exec(genreId , 'newName')
      expect(res.status).toBe(401);
    })

    it('should return error if genreId is notGiven' , async () => {
      genreId = ''
      const res = await exec(genreId , 'newName')
      expect(res.status).toBe(404)
    })

    it('should return error if genreId is not found' , async () => {
      genreId = new mongoose.Types.ObjectId().toHexString()
      const res = await exec(genreId , 'newName')
      expect(res.status).toBe(404)
    })
    it('should delete it is valid ',async() => {
      const res = await exec(genreId)
      expect(res.status).toBe(200);
    })
  })
});
