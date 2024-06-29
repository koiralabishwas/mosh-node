const express = require("express");
const server = express();
const router = require("./routes/genreRoutes")

server.use(express.json());

server.use("/api/genres" , router)

// configs
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("listening to PORT ==> " + port));

