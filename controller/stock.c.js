const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, stockRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    addStock: async (req, res) => {
        const {product_id, size_id, quantity} = req.body;
        
        const stock = await stockRepo.save({product_id, size_id, quantity})
        res.redirect('admin/product')
    },
    updateStock: async (req, res) => {
        const id = req.params;
        const {product_id, size_id, quantity} = req.body;
        let stock = await stockRepo.findOne({where: {product_id, size_id}});
        stock.quantity = quantity;
        await stockRepo.save(stock);
        res.redirect('admin/product')
    }
   
    
}