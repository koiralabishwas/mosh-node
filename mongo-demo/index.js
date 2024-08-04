const mongoose = require("mongoose");

// playground  db is will be created when we hit it
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error("mongod : db connection failed"));

// define schema to

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublishes: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublishes: true,
  });
  const result = await course.save();
  console.log(result);
}
async function getCourses() {
    // mongo db queries
  // eq => equal
  // ne => notequal
  // gt => greater than
  // gte => greater than or equal to
  // lt => less than
  // lte => less than or equal to
  // in
  // nin => not in
  const courses = await Course
    // .find({price : {$gte : 10 , $lte : 20}})
    .find({price  : {$in : [10 , 15 , 20]}})
    .limit(10)
    .sort({ name: "asc" })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// createCourse()
getCourses();
