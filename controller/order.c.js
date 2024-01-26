const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, imageRepo } = require("../config/db.config");
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
        
    }

    
}