const express = require("express");
const app = express();
// Use PascalCase for class names
const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
  { id: 5, name: "course5" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  return res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
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
  res.send(course)  
})

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("No course found with the given ID");

  res.send(course);
});

// Request Param and Request Query
app.get("/api/posts/:year/:month", (req, res) => {
  const body = {
    params: req.params,
    queries: req.query,
  };
  res.send(body);
});

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