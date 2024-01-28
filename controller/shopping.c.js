const { categoryRepo, brandRepo, productRepo, imageRepo, saleRepo } = require('../config/db.config');
const paginate = require('../utils/paginate');
const { In, Between } = require('typeorm');
require('dotenv').config();

module.exports = {
    postShoppingPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || process.env.PER_PAGE_PRODUCT;
        const dataSale = await saleRepo.find();
        let dataProduct = await productRepo.find();
        const curDate = new Date();
        curDate.setHours(curDate.getHours() + 7);
        for (let product of dataProduct) {
            for (let sale of dataSale) {
                if (sale.product_id === product.id && (new Date(sale.expire) > curDate)) {
                    product.percent = sale.percent;
                    product.price_discount = Math.floor(parseInt(product.price) * (1 - sale.percent / 100.0));
                    break;
                }
            }
            if (product?.percent) {
                product.isSale = true;
            } else {
                product.isSale = false;
                product.price_discount = product.price;
            }
        }

        const query = [];
        if (req.body.search) {
            for (let i of req.body.search.split(' ')) {
                i = i.toLowerCase();
                query.push(i);
            }

            dataProduct = dataProduct.filter(e => {
                for (let i of query) {
                    if (!e.name.toLowerCase().includes(i)) {
                        return false;
                    }
                }
                return true;
            })
        }

        if (req.body.sortby && req.body.sortby === 'oldest-product') {
            dataProduct.sort((a, b) => a.id - b.id);
        } else if (req.body.sortby && req.body.sortby === 'latest-product') {
            dataProduct.sort((a, b) => b.id - a.id);
        } else if (req.body.sortby && req.body.sortby === 'price-increment') {
            dataProduct.sort((a, b) => a.price_discount - b.price_discount);
        } else if (req.body.sortby && req.body.sortby === 'price-descrement') {
            dataProduct.sort((a, b) => b.price_discount - a.price_discount);
        }
        if (req.body.category) {
            dataProduct = dataProduct.filter(e => {
                return req.body.category.includes(e.cat_id);
            });
        }
        if (req.body.brand) {
            dataProduct = dataProduct.filter(e => {
                return req.body.brand.includes(e.brand_id);
            });
        }
        if (req.body.price && req.body.price[0] < req.body.price[1]) {
            dataProduct = dataProduct.filter(e => e.price_discount >= req.body.price[0] && e.price_discount <= req.body.price[1]);
        }

        const total = dataProduct.length;
        const totalPages = Math.ceil(total / limit);

        const result = dataProduct.slice((page - 1) * limit, page * limit)

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