const {
  productRepo,
  orderRepo,
  categoryRepo,
  userRepo,
  brandRepo,
  orderLineRepo,
  stockRepo,
  voucherRepo,
} = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
  getAvailableVouchers: async (req, res) => {
    const vouchers = await voucherRepo.find();
    res.json(vouchers);
  },
};
