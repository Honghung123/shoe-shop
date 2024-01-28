const { In, MoreThan } = require('typeorm');
const { cartLineRepo, sizeRepo, productRepo, imageRepo, categoryRepo, orderRepo, orderLineRepo, stockRepo, saleRepo } = require('../config/db.config')
module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { id, size, quantity } = req.body;
            let cartLine = await cartLineRepo.findOne({
                where: {
                    product_id: parseInt(id),
                    user_id: userId
                }
            })
            if (cartLine) {
                return res.status(401).json({ message: 'This product is already in the cart' });
            } else {
                const sizeId = await sizeRepo.findOne({
                    where: { size: parseInt(size) }
                })
                cartLine = await cartLineRepo.save({ user_id: userId, product_id: parseInt(id), size_id: sizeId.id, quantity: parseInt(quantity) });
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
                result.price_discount = parseInt(result.price) * (1 - sale.percent / 100.0);
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
    removeFromCart: async (req, res, next) => {
        try {
            const productId = req.body.productId;
            await cartLineRepo.delete(productId);
            res.status(200).json({ message: 'Cart line removed' });
        } catch (error) {
            console.log(error);
        }
    },
    updateCartLine: async (req, res) => {
        const { cartLineId ,productId, sizeId, newVal }= req.body;
        if (newVal <= 0) {
            return res.status(401).json({message: 'Update fail'});
        }
        const stock = await stockRepo.findOne({
            where: {
                product_id: productId,
                size_id: sizeId
            }
        })
        if (stock.quantity < newVal) {
            return res.status(401).json({message: 'Update fail'});
        }
        const cartLine = await cartLineRepo.findOne({ where: { id: cartLineId } });
        cartLine.quantity = newVal;
        const temp = await cartLineRepo.save(cartLine);
        res.status(200).json({message: 'Update successfully'});
    }


}