const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author : authorSchema, // 絶対に author が存在しなければならない
  authors : [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAutor(courseId) {
  // query and update method
  // const course = await Course.findById(courseId)
  // course.author = {
  //   name : 'Bishwas Koirala'
  // }
  // course.save()

  //directly updating method
  const course = await Course.findByIdAndUpdate({_id : courseId} , {
    // $set : {
    //   'author.name' : 'John Smith'
    // }

    $unset : {
      "author" : ""
    }
  })
  course.save()
}

// createCourse('Node Course', 
//   [
//     new Author({name : "Bishwas Koirala"}),
//     new Author({name : "Mosh Hamedanini"})
//   ]
// );

async function addAuthor(courseId , author) {
  const course = await Course.findById(courseId)
  course.authors.push(author);
  course.save()
}

async function removeAuthor(courseId , authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
  
}

// addAuthor('67b2d079db12f47d93bbe42e' , 
//   new Author({name : "Ice Cube"})
// )

removeAuthor('67b2d079db12f47d93bbe42e' , '67b2d079db12f47d93bbe42c')

// updateAutor("67b2a55b5585bb94ba8b83fd")
