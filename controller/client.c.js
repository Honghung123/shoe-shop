const { brandRepo, categoryRepo, voucherRepo, cartLineRepo, wishListRepo, addressRepo } = require("../config/db.config")

module.exports = {
    renderHomePage: async (req, res) => {
        res.render('client/home')
    },
    renderShoppingPage: async (req, res) => {
        const brands = await brandRepo.find();
        const categories = await categoryRepo.find();
        res.render('client/shopping', {brands, categories})
    },
    renderCheckoutPage: async (req, res) => {
        
        res.render('client/checkout')
    },
    renderVoucherPage: async (req, res) => {
        const currentDate = new Date();
        const vouchers = await voucherRepo.createQueryBuilder('voucher')
            .where(`CAST(voucher.date_expire as DATE) > :currentDate`, {currentDate})
            .getMany();
        res.render('client/voucher', {vouchers})
    },

    renderFavorPage: async (req, res) => {
        const userId = req.user.id;
        const wishList = await wishListRepo.find({
            where: {user_id: userId},
            relations: ['product']
        });
        res.render('client/favourite', {wishList})
    },
    renderDiscountPage: async (req, res) => {
        res.render('client/discount')
    },
    renderContactPage: async (req, res) => {
        const userId = req.user.id;
        const address = await addressRepo.find({where: use})
        res.render('client/contact')
    },
    renderAccountPage: async (req, res) => {
        const userId = req.user.id;
        const addresses = await addressRepo.find({where: {user_id: userId}})
        res.render('client/account', {user: req.user.id, addresses })
    },
    renderDetailsPage: async (req, res) => {
        
        res.render('client/details')
    },
    renderCartPage: async (req, res) => {
        const userId = req.user.id
        const total = await cartLineRepo.count({where: {user_id: userId}});
        const cartLines = await cartLineRepo.find({where: {user_id: userId}, relations: ['product']});
        console.log(cartLines);
        res.render('client/cart', {cartLines})
    }
}