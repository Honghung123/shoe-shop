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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/payment_server/public", express.static(path.join(__dirname, "payment_server/public")));
app.use(cookieParser());
app.use(
  session({
    secret: "Not so secret",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("views", "./payment_server/view");
app.set("view engine", "ejs");

const route = require("./payment_server/router/payment.r");
app.use("/", route);

app.listen(port, hostname, () => {
  console.log(`Server payment is running at ${port}`);
});
