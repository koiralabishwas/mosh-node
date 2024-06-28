const express = require('express')

const router = express.Router()

// Home route for rendering the Pug template
router.get("/", (req, res) => {
  res.render('index', { title: "My Express App", message: "Hello World" });
});

module.exports = router