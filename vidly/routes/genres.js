const express = require('express');
const router = express.Router();
const {Genre} = require("../modules/genre")
 
// const genres = [
//   { id: 1, name: 'Action' },  
//   { id: 2, name: 'Horror' },  
//   { id: 3, name: 'Romance' },  
// ];


// get 
 router.get('/', async (req, res) => {
  const genre = await Genre.find()
  res.send(genre)
});

// post
router.post('/', async (req, res) => {

  const genre = new Genre({name : req.body.name})
  result = await genre.save()
  res.send(genre)

});

// put
router.put('/:id',async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id , {name : req.body.name} , {
    new : true
  })
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre)
});


module.exports = router;