const { error } = require('console');
const {productRepo, sizeRepo, categoryRepo, } = require('../config/db.config');
const paginate = require('../utils/paginate');
const fs = require('fs');
module.exports = {
    findProducts: async (req, res, next) => {
        const filters = req.query;
        let products;
        if(!filters){
            //Find all products
            products = productRepo.find();
            //render or redirect
        }
        const {minPrice, maxPrice, sortOrder, branch, min} = filters
        
    },
    getProductsOfCategory: async (req, res, next) => {
        const {catId, page, limit} = req.query;
        const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
        res.json({products: result, total, currentPage, totalPages})
    },
    addProduct: async (req, res, next) => {
        try {
            
            console.log(req.body, req.files);
            const {name, short_des, full_des, price, brand_id, cat_id} = req.body;
            const product = await productRepo.create(req.body);
            res.json(product)
        } catch (error) {
            console.log(error);
            res.send('error')
            
        }
        
    }
    
    

}