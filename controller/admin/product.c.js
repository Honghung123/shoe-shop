const {productRepo} = require('../../config/db.config');
const paginate = require('../../utils/paginate');
module.exports = {
  getProductPage: async (req, res, next) => {
    console.log("Product page");
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
    res.render("admin/product", {products: result, total, currentPage, totalPages});
  },
  addProduct: async (req, res, next) => {
    const {name, price, quantity, catId, sizeId, short_des, full_des} = req.body;
    
  }
  
};
