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
      const genre = await new Genre({ name: "genrez" }).save();
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
    it('should return 401 if not logged in ',async () => {
      const res = await request(server)
      .post('/api/genres')
      .send({name : "genre1"})

      expect(res.status).toBe(401)
    })

    it('should return 400 if genre is invalid i.e less than 5 char ',async () => {
      const token = new User().generateAuthToken()
      const name = new Array(52).join('a')
      const res = await request(server)
      .post('/api/genres')
      .set('x-auth-token' , token)
      .send({name : name})

      expect(res.status).toBe(400)
    })
  })
});
