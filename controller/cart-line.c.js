const {cartLineRepo, productRepo, orderRepo, } = require('../config/db.config')
module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const user = req.user;
            const userId = 4;
            const {productId, quantity} = req.body;
            const product = await productRepo.findOne({where: {id: productId}});
            if(!product){
                //redirect or render error
            }
            let cartLine = await cartLineRepo.findOne({where: {product_id: productId, user_id: userId}})
            if(cartLine){
                cartLine.quantity = cartLine.quantity + quantity;
                cartLine = await cartLineRepo.save(cartLine)
            } else{
                cartLine = await cartLineRepo.save({user_id: userId, product_id: productId, quantity})
            }
            //replace json with render or redirect
            // const cartLines = await cartLineRepo.find(); //find all cart line of user
            const [cartLines, total] = await cartLineRepo.findAndCount({user_id: userId}) 
            res.json({cartLines, total});
        } catch (error) {
            console.log(error)
        }
    },
    removeFromCart: async (req, res, next) => {
        try {
            const id = req.params;
            await cartLineRepo.delete(id);
            // res.json('delete successfully');
            //TODO: render or redirect
            
        } catch (error) {
            console.log(error);
        }
    }, 
    addOneToCart: async (req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    },
   
    viewCart: async (req, res, next) => {
        try {
            // const userId = req.user.id
            const userId = 4;
            const total = await cartLineRepo.count({where: {user_id: 4}});
            //fetch cart-line and its associative product
            const cartLines = await cartLineRepo.find({where: {user_id: userId}, relations: ['product']});
            // res.json(cartLines);
            //TODO redener or direct
        } catch (error) {
            
        }
    }, 
    checkout: async (req, res, next) => {
        const {cartLinesId} = req.body;
        //call checkout api
        await cartLineRepo.delete(cartLinesId);
        
        
    },
}