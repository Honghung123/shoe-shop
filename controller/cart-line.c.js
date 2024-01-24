const { In, MoreThan } = require('typeorm');
const {cartLineRepo, productRepo, orderRepo, orderLineRepo, stockRepo} = require('../config/db.config')
module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const {productId, quantity, sizeId} = req.body;
            const product = await productRepo.findOne({where: {id: productId}});
            if(!product){
                //redirect or render error
            }
            const stock = await stockRepo.findOne({where: {product_id: productId, size_id: sizeId, quantity: MoreThan(0)}})
            if(!stock){
                // run out of stock
                res.json('Run out of stock')
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
            res.redirect('customer/cart')
        } catch (error) {
            console.log(error);
        }
    }, 
    
   
    viewCart: async (req, res, next) => {
        try {
            const userId = req.user.id
            const total = await cartLineRepo.count({where: {user_id: userId}});
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
        // const {total, checkout} = await res.json();
        // get id, and total = from checkout api
        // const userId = req.user.id;
        
        const cartLines = await cartLineRepo.find({
            where: {id: In(cartLinesId)},
            relations: ['product']
        });
        const total = 100;
        const order = await orderRepo.save({total, user_id: 4});
        let orderLines = cartLines.map((cartLine) => (
            {
                quantity: cartLine.quantity,
                product_id: cartLine.product_id,
                order_id: order.id
            }
        ))
        console.log(orderLines);
        orderLines = await orderLineRepo.save(orderLines);
        await cartLineRepo.delete(cartLinesId);
        res.json(order);
    },
    updateCartLine: async (req, res) => {
        const id = req.params;
        const {quantity} = req.body;
        const cartLine = await cartLineRepo.findOne({where: {id}});
        cartLine.quantity = quantity;
        const temp = await cartLineRepo.save(cartLine);
        res.json(temp);
        res.redirect('/carts')
    }

    
}