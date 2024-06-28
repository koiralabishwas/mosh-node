const express = require('express')

const router = express.Router()

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
  { id: 5, name: "course5" },
];


router.get("/", (req, res) => {
  return res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("No course found with the given ID");

  return res.send(course);
});

// Request Param and Request Query
router.get("/api/posts/:year/:month", (req, res) => {
  const body = {
    params: req.params,
    queries: req.query,
  };
  return res.send(body);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  return res.send(course);
});

router.put('/:id', (req , res) => {
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

router.delete('/:id',(req , res) => {
  // look up the course
  const course = courses.find(c => c.id == parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not available")
  
  let indexToDelete = courses.indexOf(course)
  courses.splice(indexToDelete,1)
  return res.status(200).send(courses)
})


module.exports = router