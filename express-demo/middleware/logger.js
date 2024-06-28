// custom middleware funciton  ⚠ next means reference to next middleware function pipeline

function log (req , res , next){
  console.log("logging.....")
  // needed this to pass when not using req , res cycle
  next()
}
module.exports = log