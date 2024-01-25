const { MoreThan } = require("typeorm");
const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, stockRepo, voucherRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    getAvailableVouchers : async (req, res) => {
        const currentDate = new Date();
        
        const vouchers = await voucherRepo.createQueryBuilder('voucher')
            .where(`CAST(voucher.date_expire as DATE) > :currentDate`, {currentDate})
            .getMany();
        res.json(vouchers)
    }
    
}