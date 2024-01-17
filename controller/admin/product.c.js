module.exports = {
    getProductPage: async (req, res, next) => {
        try {
            console.log("Product page");
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
            res.render("admin/product", {products: result, total, currentPage, totalPages});
        } catch (error) {
            
        }
    },
    updateProduct: async (req, res, next) => {
        
    }
}