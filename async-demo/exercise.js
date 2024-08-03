
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

async function promoteMail() {
  try{const customer = await getCustomer(1)
  console.log('customer' , customer)
  if (customer.isGold) {
    const movies = await getTopMovies()
    console.log('Movies' , movies)
    await sendEmail(customer.email , movies)
    console.log("Email sent")
  }} catch (err) {
    console.log(err.message)
  }
}
promoteMail()



function getCustomer(id) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email@mosh.com' 
      });
    }, 4000);  
  })
  
}

function getTopMovies() {
  return new Promise ((resolve , reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
 
}

function sendEmail(email, movies) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve();
      console.log("message sent to user")
      console.log("recieptient" ,email)
    }, 4000);
  })
}