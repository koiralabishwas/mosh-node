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
  // .find()
  // .or([{author : "Mosh"},{isPublishes : true}])
  // .and([{} , ])
  
    // .find({author : "Mosh" , isPublishes : true})
    // starts with smt
    // .find({author : /^Mosh/})
    // ends with smt
    // .find({author : /Hamedani$/})
    // contains smt
    // .find({author : /.*Mosh.*/i}) // i for disable case sensitive
    // .limit(10)
    // .sort({name : 1})
    // .select({name : 1 , tags : 1})
    // .countDocuments() // to just count how many results

  const pageNumber = 2
  const pageSize = 10
  //api/index/?pageNumber=2&pageSize=10

  const courses = await Course
    .find({author : "Mosh" , isPublishes : true})
    .skip((pageNumber -1) * pageSize) // as page number might start from 1 
    .limit(pageSize)
    .sort({name : 1})
    .select({name : 1 , tags : 1})

  
  console.log(courses)


}
// createCourse()
// getCourses();

async function updateCourse(id) {

  // // query first approach
  // // find by id => modify it's properties => save
  // const course = await Course.findById(id)
  // if (!course) 
  //   return
  // course.isPublishes = true;
  // course.author = "Another Author"
  
  // const result = await course.save()
  // console.log(result)


  // update first approach
  // update directly and get the updated document 
  const course = await Course.update({_id : id} , {
    
  })
  if (!course) 
    return
  course.isPublishes = true;
  course.author = "Another Author"
  
  const result = await course.save()
  console.log(result)

  
}

updateCourse("66ae5a13e0c378ad646a96f8")

