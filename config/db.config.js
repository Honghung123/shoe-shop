const typeorm = require('typeorm');
const userModel = require('../model/user.m')
const categoryModel = require('../model/category.m')
const productModel = require('../model/product.m')
const cartLineModel = require('../model/cart-line.m')
const orderModel = require('../model/order.m')
const sizeModel = require('../model/size.m')

const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    synchronize: true,
    logging: true,
    logger: true,
    entities: [userModel, categoryModel, productModel, cartLineModel, orderModel, sizeModel],
});

const connectDb = async () => {
    try {
        await dataSource.initialize();
        
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        console.log(`Something went wrong: Can't connect to database`);
        
    }
}
const userRepo = dataSource.getRepository('User') 
const productRepo = dataSource.getRepository('Product') 
const categoryRepo = dataSource.getRepository('Category') 
const cartRepo = dataSource.getRepository('Cart') 
const sizeRepository = dataSource.getRepository('Size')


module.exports = {connectDb, userRepo, productRepo, categoryRepo, cartRepo}