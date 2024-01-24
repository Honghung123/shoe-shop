const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, stockRepo, wishListRepo, cartLineRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    getWishListUser: async (req, res) => {
        const userId = req.user.id;
        const wishList = await wishListRepo.find({
            where: {user_id: userId},
            relations: ['product']
        });
        console.log(wishList);
        // res.redirect('/')
        res.json(wishList)
    },
    addToWishList: async (req, res) => {
        const {productId} = req.body;
        const userId = req.user.id
        const item = await wishListRepo.save({product_id: productId, user_id: userId})
        res.json(item)
        //redirect
    },
    removeFromWishList: async (req, res) => {
        const {productId} = req.query
        const userId = 1;
        //const userId = req.user.id
        await wishListRepo.delete({ user_id: userId, product_id: productId });
        res.json(wishListRepo.find({where: {user_id: userId}}))
        // res.render('/')
    },
    addToCart: async (req, res) => {
        const {productId, quantity} = req.body;
        const userId = req.user.id;
        const cartLine = cartLineRepo.find({where: {product_id: productId, user_id: userId}});
    }
    
    
    
    
}