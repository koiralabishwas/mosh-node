const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require("joi");
const express = require("express");
const log = require("./logger");
const auth = require('./auhenticator');
const { urlencoded } = require("body-parser");
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require("./routes/courses"); // Importing the courses route
const home = require('./routes/home')

const app = express();

// Setting up Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(helmet());

if (app.get('env') === "development") {
  app.use(morgan('tiny'));
  debug("Morgan enabled...");
}


// Using the courses route
app.use("/api/courses", courses);
app.use("/",home)

// Configuration logging
console.log("Application Name:", config.get('name'));
console.log("Mail Server:", config.get('mail.host'));
console.log("Mail Password:", config.get('mail.password'));

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Validation function (if you need it for validation within the routes)
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}
