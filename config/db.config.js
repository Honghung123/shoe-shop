const typeorm = require('typeorm');
const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    synchronize: true,
    logging: true,
    entities: [require('../model/user.m'), require('../model/category.m'), require('../model/product.m'), require('../model/cart-line.m')],
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


module.exports = {connectDb, userRepo, productRepo, categoryRepo, cartRepo}