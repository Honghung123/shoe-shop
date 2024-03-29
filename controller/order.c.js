const { In } = require("typeorm");
const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, imageRepo, cartLineRepo } = require("../config/db.config");
const jwt = require('jsonwebtoken')
module.exports = {
    getOrderDetails: async (req, res) => {
        const {id} = req.params;
        const order = await orderRepo.findOne({
            where: {id},
            relations: ['user']
        })
        
        
        const orderLines = await orderLineRepo.find({
            where: {order_id: id},
            relations: ['product']
            }
        );
        for(let orderLine of orderLines){
            console.log(orderLine);
            
            const image = await imageRepo.findOne({where: {product_id: orderLine.product_id}})
            console.log(image);
            orderLine.product.image = image.image;
        }
        console.log(order, orderLines);
        res.json({order, orderLines})
    },
    updateOrderStatus: async (req, res) => {
        const {orderId, status} = req.body;
        const order = await orderRepo.findOne({where: {id: orderId}});
        order.status = status;
        await orderRepo.save(order);
        res.json('Order status updated')
        // if(req.user.role == 'admin'){
        //     res.redirect('admin/order')
        // } else{
        //     //redirect to order page customer of customer
        // }
        
    },
    checkout: async (req, res, next) => {
        try {
            const {token} = req.query;
            const payload = jwt.decode(token);
            console.log(payload);
            let {cartLinesId} = payload;
            console.log(cartLinesId);
            const response = await fetch('https:/localhost:8000/transactions', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({token})
            })
        
            const transaction = await response.json();
            const {message} = transaction;
            if(message){
                return res.redirect(`/cart?error=${message}`)
            }
            
            
            console.log("Transaction in order controller", transaction);
            
            cartLinesId = cartLinesId.map(id => parseInt(id));
            console.log("Cart line int", cartLinesId);
            const cartLines = await cartLineRepo.find({
                where: {id: In(cartLinesId)},
                relations: ['product']
            });
            

            console.log(cartLines);
            const total = transaction.amount;
            console.log("Amount", transaction.amount);
            console.log(transaction);
            console.log("User has placed order is ", req.user.id);
            const order = await orderRepo.save({total, user_id: req.user.id, status: 'preparing'});

            let orderLines = cartLines.map((cartLine) => 
                ({
                    quantity: cartLine.quantity,
                    product_id: cartLine.product_id,
                    order_id: order.id,
                    total: cartLine.product.price * cartLine.quantity
                }
            ))
            
            console.log("Orderline",  orderLines);
            console.log("Order")
            orderLines = await orderLineRepo.save(orderLines);
        
            await cartLineRepo.delete(cartLinesId);
            // res.json(order);
            res.redirect(`/invoice/${order.id}`)
        } catch (error) {
            
        }
    },
    

    
}