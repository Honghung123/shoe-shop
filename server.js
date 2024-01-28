// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");
const logger = require("./middleware/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const https = require('https');

const apiDocOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Shoe shop Express API with Swagger",
      version: "0.1.0",
      description: "This is api for shoe shop developer",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      // contact: {
      //   name: "Shoe",
      //   url: "https://logrocket.com",
      //   email: "info@email.com",
      // },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routers/*.js"],
};
const swaggerSpec = swaggerJSDoc(apiDocOptions);

const { connectDb, userRepo, brandRepo } = require("./config/db.config");
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
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

require("./config/passport.config")(app);

app.set("views", "./views");
app.set("view engine", "ejs");

// Routers
app.use(logger);
const adminRouter = require("./routers/admin.r");
const authRouter = require("./routers/auth.r");
const categoryRouter = require("./routers/category.r");
const cartLineRouter = require('./routers/cart-line.r')
const productRouter = require('./routers/product.r')
const orderRouter = require('./routers/order.r')
const wishListRouter = require('./routers/wish-list.r')
const clientRouter = require('./routers/client.r');
const voucherRouter = require('./routers/voucher.r');
const brandRouter = require('./routers/brand.r')
const userRouter = require('./routers/user.r')
const favouriteRouter = require('./routers/favourite.r');

app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/carts", cartLineRouter);
app.use("/favourite", favouriteRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use('/wish-list', wishListRouter);
app.use("/", clientRouter);
app.use("/vouchers", voucherRouter);
app.use("/brands", brandRouter);
app.use("/users", userRouter)
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/orders", )
// app.use("/", passport);

// Handle exceptions
// const server = https.createServer({
//   key: fs.readFileSync('./_certs/demo.key'),
//   cert: fs.readFileSync('./_certs/demo.cert')
// }, app);

app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});
