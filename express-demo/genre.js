const express = require('express')
const server = express()

server.use(express.json())


const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "fantasy" },
  { id: 3, name: "fiction" },
  { id: 4, name: "suspense" },
  { id: 5, name: "history" },
];

// TODO: get all the genre
// TODO: create genre
// TODO: update genre
// TODO: delete genre
// TODO: add shema
server.get("/api/genres" , (req , res) => {
  return res.send(genres)
}) 


// configs
const port = process.env.PORT || 3000
server.listen(port , () => console.log("listening to PORT==>" + port))