const winston = require('winston')
require("winston-mongodb")
require('express-async-errors')


module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({filename : 'UncaughtExceptions.log'}),
    process.on('unhandledRejection',(ex)=> {
      throw ex
    })
  )
  winston.add(new winston.transports.File({filename : 'log.log'})) 
  winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/vidly' , level:'info'}))
}