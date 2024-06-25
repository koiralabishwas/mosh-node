function auth(req , res , next) {
  console.log("authentication.....")
  // needed this to pass when not using req , res cycle
  next()
}

module.exports = auth