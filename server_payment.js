require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PAYMENT_PORT;
const hostname = process.env.HOST;
const ejs = require("ejs");
const fs = require('fs');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");
const logger = require("./middleware/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc"); 
const https = require('https');
const cors = require('cors')
const {connectDb} = require('./payment_server/dbConfig');
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/payment_server/public", express.static(path.join(__dirname, "payment_server/public")));
app.use(cookieParser());
app.use(cors());



app.set("views", "./payment_server/view");
app.set("view engine", "ejs");

const route = require("./payment_server/router/payment.r");
const transactionRoute = require('./payment_server/router/transaction.r')
const accountRoute = require('./payment_server/router/account.r')
app.use(logger)
app.use("/", route);
app.use('/transactions', transactionRoute);
app.use("/accounts", accountRoute);



const options = {
  key: fs.readFileSync('./payment_server/certificates/key.pem', 'utf-8'),
  cert: fs.readFileSync('./payment_server/certificates/server.crt', 'utf-8')
}



const server = https.createServer(options, app);

server.listen(port, hostname, () => console.log(`Payment server running at port ${port}`))
