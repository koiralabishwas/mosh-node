const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users')
const auth = require('./routes/auth')
const express = require('express');
const error = require('./middleware/error');
const app = express();


if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR : JWT Private Key is not defined ')
  process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//NOTE: we can use error handling route in express at the end of route
app.use(error)

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));