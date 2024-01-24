// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs/promises");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multipart = require('connect-multiparty')
const logger = require("./middleware/logger");


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
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
// app.use(multipart());


require("./config/passport.config")(app);

app.set("views", "./views");
app.set("view engine", "ejs");

// Routers
app.use(logger);
const adminRouter = require("./routers/admin.r");
const authRouter = require("./routers/auth.r");
const categoryRouter = require('./routers/category.r')
const passport = require("passport");
const cartLineRouter = require('./routers/cart-line.r')
const productRouter = require('./routers/product.r')
const orderRouter = require('./routers/order.r')
const wishListRouter = require('./routers/wish-list.r')
app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/carts", cartLineRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.use('/wish-list', wishListRouter)

// app.use("/orders", )
// app.use("/", passport);

// Handle exceptions

app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});


