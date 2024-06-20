const express = require("express");
const app = express();
// use pascal case for class names
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
  res.send("FUck you ");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error)
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) res.status(404).send("no course found with the given id");

  res.send(course);
});

// request Param   and Request query
app.get("/api/posts/:year/:month", (req, res) => {
  const body = {
    parmas: req.params,
    queries: req.query,
  };
  res.send(body);
});

// PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
// app.post()
// app.put()
// app.delete()
