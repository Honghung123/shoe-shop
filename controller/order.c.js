const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo } = require("../config/db.config");
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
        console.log(order, orderLines);
        res.json({order, orderLines})
    },
    updateOrderStatus: async (req, res) => {
        try {
            const {orderId, status} = req.body;
            let order = await orderRepo.findOne({where: {id: orderId}});
            order.status = status;
            await orderRepo.save(order);
            res.json(order)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'})
        }
    }
}