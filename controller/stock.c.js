const {
  productRepo,
  orderRepo,
  categoryRepo,
  userRepo,
  brandRepo,
  orderLineRepo,
  stockRepo,
} = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
  addStock: async (req, res) => {
    const { product_id, size_id, quantity } = req.body;
    const stock = await stockRepo.save({ product_id, size_id, quantity });
    res.status(201).json(stock);
  },
  updateStock: async (req, res) => {
    const id = req.params;
    const { product_id, size_id, quantity } = req.body;
    let stock = await stockRepo.findOne({ where: { product_id, size_id } });
    stock.quantity = quantity;
    stock = await stockRepo.save(stock);
    res.json(stock);
  },
  deleteStock: async (req, res) => {
    const id = req.params;
    await stockRepo.delete(id);
    res.json("Stock is deleted");
  },
};
