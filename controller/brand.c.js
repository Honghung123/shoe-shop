const { Between, In } = require("typeorm");
const { orderLineRepo, orderRepo } = require("../config/db.config");

module.exports = {
    getTop5BrandRevenueByMonth: async (req, res) => {
        const {month_year} = req.query || '2024-01';
        if(!month_year){
            res.status(400).json('Bad request')
        }
        const monthAndYear = month_year.split('-');
        const month = parseInt(monthAndYear[1]);
        const year = parseInt(monthAndYear[0]);
        console.log(month, year);
        
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        console.log(startDate, endDate);
        const orders = await orderRepo.find({ where: { created_at: Between(startDate, endDate) } });
        const ordersId = orders.map(order => order.id);

        const orderLines = await orderLineRepo.find({
            where: { order_id: In(ordersId) },
            relations: ['product', 'product.brand']
        })
        console.log(orderLines);
        const brandRevenueMap = new Map();
        for (const orderLine of orderLines) {
            const brandName = orderLine.product.brand.brand_name
            const revenue = orderLine.total;
            if (brandRevenueMap.has(brandName)) {
                brandRevenueMap.set(brandName, parseInt(brandRevenueMap.get(brandName)) + parseInt(revenue));
            } else {
                brandRevenueMap.set(brandName, parseInt(revenue));
            }
        }
        const brandRevenueArray = Array.from(brandRevenueMap.entries());
        brandRevenueArray.sort((a, b) => b[1] - a[1]);
        const top5Brands = brandRevenueArray.slice(0, 5);
        res.json({top5Brands});
    },
    topFiveBrandHighestSales: async (req, res) => {
        const now = new Date();
        const year = now.getFullYear();
        const startOfYear = new Date(year, 0, 1, 0, 0, 0);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59);
        const orders = await orderRepo.find({where: {created_at: Between(startOfYear, endOfYear)}});
        const ordersId = orders.map(order => order.id);
        const orderLines = await orderLineRepo.find({
            where: { order_id: In(ordersId) },
            relations: ['product', 'product.brand', 'order']
        })
        const brandQuantitiesByMonth = orderLines.reduce((result, orderLine) => {
            const { product } = orderLine;
            const { brand } = product;
            console.log(brand);
            console.log(orderLine);
      
            // Extract the month from the sold_at timestamp
            const month = new Date(orderLine.order.created_at).getMonth();
            console.log(orderLine.created_at);
            // const month = orderLine.created_at.getMonth() + 1; // Adding 1 because months are zero-based
            console.log("Month of order", month);
            // Initialize the brand entry if not present
            if (!result[brand.id]) {
              result[brand.id] = {
                brandId: brand.id,
                brandName: brand.brand_name,
                quantitiesByMonth: Array.from({ length: 12 }, () => 0),
                totalSold: 0
              };
            }
      
            // Initialize the month entry if not present
            
      
            // Accumulate the sold quantity for the brand and month
            result[brand.id].quantitiesByMonth[month] += parseInt(orderLine.quantity);
            result[brand.id].totalSold += parseInt(orderLine.quantity);
            
            return result;
          }, {});
          let result = Object.values(brandQuantitiesByMonth);
          result.sort((a, b) => b.totalSold - a.totalSold);
          result = result.slice(0,5)
          console.log(result);
          res.json(result);
        
    }
}