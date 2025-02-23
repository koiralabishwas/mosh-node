const mongoose = require('mongoose')
const id = new mongoose.Types.ObjectId()
console.log(id)
console.log(id.getTimestamp())
console.log(mongoose.Types.ObjectId.isValid('1234'))

//NOTE : 
// _id : 67bac614b0886d543c37cfca

// id is 12 bytes
  // 4byte => timestamp
  // 3byte => machine identifier 
  // 2byte => process identifier
  // 3byte => counter