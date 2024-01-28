const {cartLineRepo, productRepo, saleRepo, imageRepo} = require('../config/db.config')
const cartReview = async (userID) => {
    const carts = await cartLineRepo.find({
        take: 2,
        where: { user_id: userID },
        order: {id: 'DESC'}
    });
    const curDate = new Date();
    curDate.setHours(curDate.getHours() + 7);

    for (let i of carts) {
        let product = await productRepo.findOne({
            where: {
                id: parseInt(i.product_id)
            }
        });
        const sale = await saleRepo.findOne({
            where: { product_id: parseInt(i.product_id) }
        });
        if (sale && (new Date(sale.expire) > curDate)) {
            product.isSale = true;
            product.price_discount = Math.floor(parseInt(product.price) * (1 - sale.percent / 100.0));
        } else {
            product.isSale = false
        }
        const image = await imageRepo.findOne({
            where: { product_id: product.id }
        });
        product.image = image.image;
        i.product = product;
    }
    return carts;
}
module.exports = cartReview;