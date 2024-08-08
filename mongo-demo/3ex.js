const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => {
    console.log('connected to mongo-exercise')

  }).catch((err) => console.error("err" , err.message))


const courseSchema = new mongoose.Schema({
  name : String , 
  author : String , 
  tags : [String],
  date : {type : Date , default : Date.now},
  isPublished : Boolean ,
  price : Number
})

const Course = mongoose.model("Courses" , courseSchema)

async function getCourses() {
  return await Course
    .find({isPublished : true})
    .or([{price : {$gte : 15}} , {name : /.*by*./i}]) // i here means case insensitive
    // .sort("-price")
    // .select('name author price')
    

}
async function run() {
  const courses = await getCourses()
  console.log(courses)
  
}
run()