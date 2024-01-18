const {productRepo} = require('../config/db.config');
const paginate = require('../utils/paginate');
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
    
    

}