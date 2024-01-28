const { categoryRepo, productRepo, imageRepo, saleRepo } = require('../config/db.config');
const { MoreThan, Equal } = require('typeorm');
require('dotenv').config();

module.exports = {
    postDiscountPage: async (req, res, next) => {
        const currentDateOrigin = new Date();
        // Đặt giờ theo giờ địa phương
        currentDateOrigin.setHours(currentDateOrigin.getHours() + 7);
        let sales = await saleRepo.find({
            where: { expire: MoreThan(currentDateOrigin) },
            order: { product_id: 'ASC' }
        });
        for (let i of sales) {
            const product = await productRepo.findOne({
                where: { id: i.product_id }
            })
            const image = await imageRepo.findOne({
                where: { product_id: product.id }
            });
            product.image = image.image;
            const cat = await categoryRepo.findOne({
                where: { id: product.cat_id }
            });
            product.cat_name = cat.name;
            product.price_discount = Math.floor(product.price * parseInt(100 - i.percent) / 100.0);
            i.product = product;
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || process.env.PER_PAGE_DISCOUNT;
        const total = sales.length;
        const totalPages = Math.ceil(total / limit);
        const result = sales.slice((page - 1) * limit, (page - 1) * limit + limit);
        console.log((page - 1) * limit, (page - 1) * limit + limit);
        res.json({
            sales: result,
            total,
            currentPage: page,
            totalPages,
        });
    }
}