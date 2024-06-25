const express = require("express");
const { z } = require("zod");
const server = express();

server.use(express.json());

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "fantasy" },
  { id: 3, name: "fiction" },
  { id: 4, name: "suspense" },
  { id: 5, name: "history" },
  { id: 6, name: "hentai" },
];

// did : get all the genre
// did: create genre
// TODO: update genre
// TODO: delete genre
// did : add shema

// GET all genres
server.get("/api/genres", (req, res) => {
  return res.send(genres);
});

// POST : create  a new genre
server.post("/api/genres", (req , res) => {

  const {error , success} = validateBody(req.body)
  if (!success)  {
    return res.status(400).send(error.errors)
  }

  const newGenre = {id : genres.length + 1 , name : req.body.name}
  genres.push(newGenre)

  return res.status(200).send(newGenre)


})

// update
server.put("/api/genres/:id" , (req , res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
      return res.send("no genre found by id ")

  const {error , success} = validateBody(req.body)
  if (!success)  
    return res.send(error.errors)
  
  genre.name = req.body.name

  return res.status(200).send({"genre updated" : genre})

})

server.delete("/api/genres/:id", (req , res) => {
  // look up for the genre id
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("no genre with ==>> id:" + req.params.id)

  const indexToDelete = genres.indexOf(genre)

  genres.splice(indexToDelete , 1)

  return res.send(genres)
})


// configs
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("listening to PORT==>" + port));

const validateBody = (reqbody) => {
  const schema = z.object({
    name : z.string().min(3)
  })
  const validation = schema.safeParse(reqbody) 
  return validation
}
