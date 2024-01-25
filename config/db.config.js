const typeorm = require('typeorm');
const userModel = require('../model/user.m')
const categoryModel = require('../model/category.m')
const productModel = require('../model/product.m')
const cartLineModel = require('../model/cart-line.m')
const orderModel = require('../model/order.m')
const sizeModel = require('../model/size.m')
const orderLineModel = require('../model/order-line.m');
const brandModel = require('../model/brand.m');
const stockModel = require('../model/stock.m');
const imageModel = require('../model/image.m');
const addressModel = require('../model/address.m');
const wishListModel = require('../model/wish-list.m')
const voucherModel = require('../model/voucher.m');
const hashPwd = require('../utils/hashPassword');



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
    entities: [userModel, categoryModel, productModel, cartLineModel, orderModel, sizeModel, orderLineModel, brandModel, stockModel, imageModel, addressModel,  voucherModel, wishListModel],
});

const connectDb = async () => {
    try {
        await dataSource.initialize();
        const user = await userRepo.findOne({where: {email: 'admin@gmail.com'}})
        if(!user){
            const password = await hashPwd('admin')
            console.log("creating admin account");
            await userRepo.save({email: 'admin@gmail.com', password, username: 'Admin', role: 'admin'})
        }
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        console.log(`Something went wrong: Can't connect to database`);
        
    }
}
const userRepo = dataSource.getRepository('User') 
const productRepo = dataSource.getRepository('Product') 
const categoryRepo = dataSource.getRepository('Category') 
const cartLineRepo = dataSource.getRepository('CartLine')
const sizeRepo = dataSource.getRepository('Size');
const brandRepo = dataSource.getRepository('Brand');
const orderRepo = dataSource.getRepository('Order')
const orderLineRepo = dataSource.getRepository('OrderLine');
const stockRepo = dataSource.getRepository('Stock');
const addressRepo = dataSource.getRepository('Address')
const imageRepo = dataSource.getRepository('ProductImage');
const voucherRepo = dataSource.getRepository('Voucher');
const wishListRepo = dataSource.getRepository('WishList')





module.exports = {connectDb, userRepo, productRepo, categoryRepo, cartLineRepo, sizeRepo, orderRepo, orderLineRepo, brandRepo, stockRepo, addressRepo, imageRepo,  voucherRepo, wishListRepo}
