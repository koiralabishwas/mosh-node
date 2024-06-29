
const { z } = require("zod");

const express = require('express')
const router = express.Router()

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "fantasy" },
  { id: 3, name: "fiction" },
  { id: 4, name: "suspense" },
  { id: 5, name: "history" },
  { id: 6, name: "hentai" },
];



// GET all genres
router.get("/", (req, res) => {
  return res.send(genres);
});
// GET get the specifi genres
router.get("/:id" , (req , res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if(!genre)
    return res.status(404).send("no genre with id:" + req.params.id)
  return res.status(200).send(genre)
})

// POST : create  a new genre
router.post("/", (req , res) => {

  const {error , success} = validateBody(req.body)
  if (!success)  {
    return res.status(400).send(error.errors)
  }

  const newGenre = {id : genres.length + 1 , name : req.body.name}

  genres.push(newGenre)

  return res.status(200).send(newGenre)


})

// update
router.put("/:id" , (req , res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
      return res.send("no genre found by id " + req.params.id)

  const {error , success} = validateBody(req.body)
  if (!success)  
    return res.send(error.errors)
  
  genre.name = req.body.name

  return res.status(200).send({"genre updated" : genre})

})

router.delete("/:id", (req , res) => {
  // look up for the genre id
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("no genre with ==>> id:" + req.params.id)

  const indexToDelete = genres.indexOf(genre)

  genres.splice(indexToDelete , 1)

  return res.send(genres)
})

const validateBody = (reqbody) => {
  const schema = z.object({
    name : z.string().min(3)
  })
  const validation = schema.safeParse(reqbody) 
  return validation
}



module.exports = router