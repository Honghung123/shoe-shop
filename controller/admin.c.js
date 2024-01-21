const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    getProductPage: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const brands = await brandRepo.find();
            const categories = await categoryRepo.find();
            const sizes = await categoryRepo.find();
            const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
            console.log(result, total, currentPage, totalPages);
            res.render("admin/product", {products: result, total, currentPage, totalPages, brands, categories, sizes});
        } catch (error) {
            console.log(error)
        }
    }, 
    getOrderPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(orderRepo, page, limit);
        res.render("admin/order");
    },
    getDashboardPage: (req, res, next) => {
        
        res.render("admin/dashboard");
    },
    getCategoryPage: async (req, res, next) => {
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(categoryRepo, page, limit);
        console.log(result, total, currentPage, totalPages);
        res.render("admin/category", {categories: result, total, currentPage, totalPages});
    },
    getAccountPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(userRepo, page, limit);
        res.render("admin/account", {users: result, total, currentPage, totalPages});
    },
}