module.exports = function (req , res , next ) {
  // req.user が送られる by auth function 
  if (!req.user.isAdmin) return res.status(403).send('Access Denied . Forbidden request ')
  next()
}