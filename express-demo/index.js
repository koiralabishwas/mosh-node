const debug = require('debug')('app:startup')
const config = require('config')
// Use PascalCase for class names
const Joi = require("joi");
const logger =  require('./logger')
const express = require("express");
const log = require("./logger");
const auth = require('./auhenticator');
const { urlencoded } = require("body-parser");
// helmet for html headers
const helmet = require('helmet')
// morgan
const morgan = require('morgan')


const app = express();

// console.log("NODE_ENV : " , process.env.NODE_ENV)
// // same code to get the current development envk
// console.log("app  : " ,app.get("env"))


// express middlewares
app.use(express.json());

// send key=vaule&key=value on query stings i.e used in html forms smtime
app.use(express.urlencoded({extended : true}))
// to host static files
app.use(express.static('static'))
// app.use(logger)
// app.use(auth)

app.use(helmet())

// configurations by using config packages
console.log("applicaton Name: " , config.get('name'))
console.log("Mail Server: " , config.get('mail.host'))
console.log("Mail Password:" , config.get('mail.password'))

if (app.get('env') === "development") {
  // enable morgan only in development
  app.use(morgan('tiny'))
  debug("morgan enabled.....")

}




const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
  { id: 5, name: "course5" },
];

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  return res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("No course found with the given ID");

  return res.send(course);
});

// Request Param and Request Query
app.get("/api/posts/:year/:month", (req, res) => {
  const body = {
    params: req.params,
    queries: req.query,
  };
  return res.send(body);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  return res.send(course);
});

app.put('/api/courses/:id', (req , res) => {
  // look up the course
  // not existing return 404
  const course = courses.find(c => c.id === parseInt(req.params.id)) 
  if (!course) return res.status(404).send('The course with the given ID was not found')

  const {error} = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //validate and return error if invalid 

    // update record
  course.name = req.body.name
  return res.send(course)  
})

app.delete('/api/courses/:id',(req , res) => {
  // look up the course
  const course = courses.find(c => c.id == parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not available")
  
  let indexToDelete = courses.indexOf(course)
  courses.splice(indexToDelete,1)
  return res.status(200).send(courses)
})

// PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}