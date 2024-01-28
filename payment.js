require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PAYMENT_PORT;
const hostname = process.env.HOST;
const ejs = require("ejs");
const fs = require("fs/promises");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");
const logger = require("./middleware/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const paymentRouter = require('./routers/payment.r')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "Not so secret",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("views", "./views/payment");
app.set("view engine", "ejs");

app.use('/', paymentRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});

