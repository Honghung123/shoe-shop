const { favouriteRepo, sizeRepo, productRepo, imageRepo, categoryRepo, orderRepo, orderLineRepo, stockRepo, saleRepo } = require('../config/db.config')
module.exports = {
    addToFavourite: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { id } = req.body;
            let favourite = await favouriteRepo.findOne({
                where: {
                    product_id: parseInt(id),
                    user_id: userId
                }
            })
            if (favourite) {
                return res.status(401).json({ message: 'This product is already in favourite' });
            } else {
                favourite = await favouriteRepo.save({ user_id: userId, product_id: parseInt(id) });
            }

            let result = await productRepo.findOne({
                where: {
                    id: parseInt(id)
                }
            });
            const sale = await saleRepo.findOne({
                where: { product_id: parseInt(id) }
            });
            const curDate = new Date();
            curDate.setHours(curDate.getHours() + 7);
            if (sale && (new Date(sale.expire) > curDate)) {
                result.isSale = true;
                result.price_discount = Math.floor(parseInt(result.price) * (1 - sale.percent / 100.0));
            } else {
                result.isSale = false
            }
            const image = await imageRepo.findOne({
                where: { product_id: result.id }
            });
            result.image = image.image;
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    removeFromFavourite: async (req, res, next) => {
        try {
            const productId = req.body.productId;
            await favouriteRepo.delete(productId);
            res.status(200).json({ message: 'Favourite removed' });
        } catch (error) {
            console.log(error);
        }
    },


}