const { categoryRepo, brandRepo, productRepo, imageRepo } = require('../config/db.config');
const paginate = require('../utils/paginate');
const {In, Between} = require('typeorm');

module.exports = {
    postShoppingPage: async (req, res, next) => {
        console.log(req.body);
        const page = req.query.page || 1;
        const limit = req.query.limit || process.env.PER_PAGE_PRODUCT;

        let orderCondition = {};
        let whereCondition ={};

        if (req.body.sortby && req.body.sortby !== 'default') {
            orderCondition = { price: req.body.sortby };
        }
        if (req.body.category) {
            whereCondition.cat_id = In(req.body.category);
        }
        if (req.body.brand) {
            whereCondition.brand_id = In(req.body.brand);
        }
        if (req.body.price && req.body.price[0] < req.body.price[1]) {
            whereCondition.price = Between(req.body.price[0], req.body.price[1]);
        }

        const skip = (page - 1) * limit;
        const [result, total] = await productRepo.findAndCount({ 
            take: limit, 
            skip,
            order: orderCondition,
            where: whereCondition
        });
        const totalPages = Math.ceil(total / limit);

        for (let i = 0; i < result.length; i++) {
            const image = await imageRepo.findOne({
                where: { product_id: result[i].id }
            });
            result[i].image = image.image;
            const cat = await categoryRepo.findOne({
                where: { id: result[i].cat_id }
            });
            result[i].cat_name = cat.name;
        }

        res.json({
            products: result,
            total,
            totalPages,
            currentPage: page
        });
    }
}