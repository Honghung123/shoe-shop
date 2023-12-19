// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs/promises");

const {connectDb, userRepo} = require('./config/db.config')
const port = process.env.PORT;
const hostname = process.env.HOST;
connectDb();


app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs"); 
 

// Routers
const router = require("./routers/router.r");
app.use("/", router);

// Handle exceptions


app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});
