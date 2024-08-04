
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });


async function promotion() {
  try{
    const customer = await getCustomer(1)
    console.log("customer" , customer)
    if (customer.isGold) {
      const topMovies = await getTopMovies()
    console.log("movie list" , topMovies)
    const sentEmail = await sendEmail(customer.email , topMovies)
    console.log("Email sent" , sentEmail)
    }
  } catch(err) {
    console.log("Error=>" ,err.message)
  }
}
promotion()

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({ 
//       id: 1, 
//       name: 'Mosh Hamedani', 
//       isGold: true, 
//       email: 'email' 
//     });
//   }, 4000);  
// }

// Promise ver
function getCustomer(id) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve({
        id : id,
        name : "Mosh Hamedani" ,
        isGold : true,
        email : "mosh@gmail.com"
      })
    },4000)
  })
}

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(['movie1', 'movie2']);
//   }, 4000);
// }

function getTopMovies() {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve(["movie1" , "movie2" , "movie3"])
    }, 4000);
  })
}


// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback();
//   }, 4000);
// }

function sendEmail(email , movies) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      // resolve(`email sent to ${email} with these movies : ${movies}`)
      reject(new Error("failed to send email"))
    }, 4000);
  })
}