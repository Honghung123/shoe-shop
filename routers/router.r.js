const express = require("express");
const routers = express.Router();
routers.get("/", (req, res) => {
  res.render("client/home.ejs");
});

module.exports = routers;
