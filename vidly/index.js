require('express-async-errors')
const winston = require('winston')
require("winston-mongodb")
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

const app = express();

require('./startup/routes')(app)

// // only works in syncronous code
// process.on('uncaughtException' , (ex)=> {
//   winston.error(ex.message , ex)
//   process.exit(1)
// })

// process.on('unhandledRejection',(ex) => {
//   winston.error(ex.message,ex)
//   process.exit(1)
// })



if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR : JWT Private Key is not defined ')
  process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

new winston.ExceptionHandler(
  new winston.transports.File({filename : 'IncaughtExceptions.log'}),

  process.on('unhandledRejection',(ex)=> {
    throw ex
  })
)

winston.add(new winston.transports.File({filename : 'log.log'})) 
winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/vidly' , level:'info'}))

// NOTE : need to use process.on('uncaughtException)
// throw new Error('here, error wont get caught by default winston,use process.on("uncaughtException") ')




//NOTE: we can use error handling route in express at the end of route
app.use(error)

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));