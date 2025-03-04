module.exports = function asyncMiddleware(handler){
  return async (req , res , next) => {
    try {
      await handler(req,res)
    } catch (ex) {
      ex.fuckingUnexpecXXXXX = "XXXXXXXXXXXXXXXXXXXX"
      next(ex)
    }
  }
}

/**
 * NOTE : 
 * wrap middleware functions with this route for a manual async error handler.
 * It will prevent node from crashing with errors and make it constantly trace log
 * 
 * or use express-async-errors npm package
 */