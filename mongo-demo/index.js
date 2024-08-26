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
  name: {
    type : String ,
    required : true,
    minlength : 5,
    maxlength : 226,
  },
  category : {
    type : String,
    enum : ["web" , "mobile" , "network"],
    lowercase : true, // automatically converts to lower case 
    // uppercase : true,
    trim : true // removes spaces automatically
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "At least 1 tag is required.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublishes: Boolean,
  price : {
    type : Number ,
    // logic => required when it isPublihes is true(arrfunc doest support this.method so use regular func)
    required :function () {return this.isPublishes},
    min : 10,
    max : 200,
    get : v => Math.round(v), // value is rounded when HTTP GET
    set : v => Math.round(v) // value is rounded when HTTP POST
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    category : "Web",
    tags : ["frontend"],
    isPublishes: true, 
    price : 10.6
  });

  try {
    const result = await course.save()
    console.log(result)
  } catch (ex) {
    console.log(ex.errors)
    //to find errors from each properties
    // for (field in ex.errors)
    //   console.log(ex.errors[field].message)
  }
}

// createCourse()

async function getCourses() {
    // mongo db queries
  // eq => equal
  // ne => notequal
  // gt => greater than
  // gte => greater than or equal to
  // lt => less than
  // lte => less than or equal to
  // inu
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
    .find({_id : "66b6ea4dddb3eec598241545"})
    // .skip((pageNumber -1) * pageSize) // as page number might start from 1 
    // .limit(pageSize)
    .sort({name : 1})
    .select({name : 1 , price : 1})

  
  console.log(courses[0].price)


}
getCourses();

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
//  const result = await Course.updateMany({_id : id} , {
  const course = await Course.findByIdAndUpdate(id , {
    $set : {
      author : "fuck me daddy",
      isPublished : "False"
    }
  } , {new : true})
  console.log(course)
}


async function removeCourse(id) {
  const result = await Course.deleteOne( {_id : id})
  console.log(result )
}
