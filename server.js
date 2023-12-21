// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs/promises");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const cors = require("cors");

const { connectDb, userRepo } = require("./config/db.config");
const port = process.env.PORT;
const hostname = process.env.HOST;
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "Not so secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   "Access-Control-Allow-Credentials": true
// };
// app.use(cors(corsOptions))

require("./config/passport.config")(app);

app.set("views", "./views");
app.set("view engine", "ejs");

// Routers
app.use(logger);
const router = require("./routers/router.r");
const authRouter = require("./routers/auth.r");
const passport = require("passport");

app.use("/", authRouter);
app.use("/", router);
// app.use("/", passport);

// Handle exceptions

app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});
