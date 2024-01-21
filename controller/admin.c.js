const { In, Between } = require("typeorm");
const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    getProductPage: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const brands = await brandRepo.find();
            const categories = await categoryRepo.find();
            const sizes = await categoryRepo.find();
            const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
            console.log(result, total, currentPage, totalPages);
            res.render("admin/product", {products: result, total, currentPage, totalPages, brands, categories, sizes});
        } catch (error) {
            console.log(error)
        }
    }, 
    getOrderPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(orderRepo, page, limit);
        res.render("admin/order");
    },
    getDashboardPage: async (req, res) => {
        const now = new Date();
        const month = req.query.month || now.getMonth() + 1;
        const year = req.query.year || now.getFullYear();
        const bestSeller = req.query.bestSeller || 'yearly';
        const startDate = new Date(year, month-1, 1);
        const endDate = new Date(year, month, 1);
        const selectedDate = req.query.selectedDate || now;
        const selectedMonth = req.query.selectedMonth || now.getMonth()+ 1;
        const selectedYear = req.query.selectedYear || now.getFullYear();
        console.log(startDate, endDate);
        let ordersInPeriod = null;
        if(bestSeller === 'daily'){
            console.log(selectedDate);
            ordersInPeriod = await orderRepo
                .createQueryBuilder('order')
                .where('CAST(order.created_at AS DATE) = :selectedDate', { selectedDate })
                .getMany();
        } else if(bestSeller === 'monthly'){
            ordersInPeriod = await orderRepo
                .createQueryBuilder('order')
                .where(`EXTRACT(YEAR FROM order.created_at) = :selectedYear`, { selectedYear })
                .andWhere(`EXTRACT(MONTH FROM order.created_at) = :selectedMonth`, { selectedMonth })
                .getMany();
        } else {
            ordersInPeriod = await orderRepo
                .createQueryBuilder('order')
                .where(`EXTRACT(YEAR FROM order.created_at) = :selectedYear`, { selectedYear })
                .getMany();
        }
        const ordersInPeriodId = ordersInPeriod.map(order => order.id);
        const orderLinesInPeriod = await orderLineRepo.find({
            where: {order_id: In(ordersInPeriodId)},
            relations: ['product']
        });

        let bestSellerProductMap = new Map();
        for (const orderLine of orderLinesInPeriod) {
            const productName = orderLine.product.name;
            const quantity = orderLine.quantity;
            if (bestSellerProductMap.has(productName)) {
              bestSellerProductMap.set(productName, bestSellerProductMap.get(productName) + quantity);
            } else {
              bestSellerProductMap.set(productName, quantity);
            }
        }
        const bestSellersArray = Array.from(bestSellerProductMap.entries());
        // Sort the array in descending order based on total quantity sold
        bestSellersArray.sort((a, b) => b[1] - a[1]);
        // Limit the result to the top 5 products
        const top5BestSellers = bestSellersArray.slice(0, 5);
        console.log("Top5Product", top5BestSellers);
        
        const orders = await orderRepo.find({where: {created_at: Between(startDate, endDate)}});
        const ordersId = orders.map(order => order.id);
        console.log(ordersId);
        const orderLines = await orderLineRepo.find({
            where: {order_id: In(ordersId)},
            relations: ['product', 'product.brand']
        })
        console.log(orderLines);
        const brandRevenueMap = new Map();
        
    

        for (const orderLine of orderLines) {
            const brandName = orderLine.product.brand.brand_name
            const revenue = orderLine.total;
            if (brandRevenueMap.has(brandName)) {
                brandRevenueMap.set(brandName, brandRevenueMap.get(brandName) + revenue);
            } else {
                brandRevenueMap.set(brandName, revenue);
            }
        }
        const brandRevenueArray = Array.from(brandRevenueMap.entries());
        brandRevenueArray.sort((a, b) => b[1] - a[1]);
        const top5Brands = brandRevenueArray.slice(0, 5);
        
        res.render("admin/dashboard", {top5Brands: Object.fromEntries(top5Brands), top5Products: Object.fromEntries(top5Products)});
    },
    getCategoryPage: async (req, res, next) => {
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(categoryRepo, page, limit);
        console.log(result, total, currentPage, totalPages);
        res.render("admin/category", {categories: result, total, currentPage, totalPages});
    },
    getAccountPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const {result, total, currentPage, totalPages} = await paginate(userRepo, page, limit);
        res.render("admin/account", {users: result, total, currentPage, totalPages});
    },
}