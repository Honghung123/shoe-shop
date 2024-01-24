const { In, Between } = require("typeorm");
const { productRepo, orderRepo, categoryRepo, userRepo, addressRepo, brandRepo, orderLineRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
const paginateAccount = require("../utils/paginateAccount");
const hashPwd = require('../utils/hashPassword');
require("dotenv").config();

module.exports = {
    getProductPage: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const brands = await brandRepo.find();
            const categories = await categoryRepo.find();
            const sizes = await categoryRepo.find();
            const { result, total, currentPage, totalPages } = await paginate(productRepo, page, limit);

            res.render("admin/product", { products: result, total, currentPage, totalPages, brands, categories, sizes, namePage: 'product' });
        } catch (error) {
            console.log(error);
        }
    },
    getOrderPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const { result, total, currentPage, totalPages } = await paginate(orderRepo, page, limit);
        res.render("admin/order", { namePage: 'order' });
    },
    getDashboardPage: async (req, res) => {
        const now = new Date();
        const month = req.query.month || now.getMonth() + 1;
        const year = req.query.year || now.getFullYear();
        const bestSeller = req.query.bestSeller || 'yearly';
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        const selectedDate = req.query.selectedDate || now;
        const selectedMonth = req.query.selectedMonth || now.getMonth() + 1;
        const selectedYear = req.query.selectedYear || now.getFullYear();

        let ordersInPeriod = null;
        if (bestSeller === 'daily') {

            ordersInPeriod = await orderRepo
                .createQueryBuilder('order')
                .where('CAST(order.created_at AS DATE) = :selectedDate', { selectedDate })
                .getMany();
        } else if (bestSeller === 'monthly') {
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
            where: { order_id: In(ordersInPeriodId) },
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


        const orders = await orderRepo.find({ where: { created_at: Between(startDate, endDate) } });
        const ordersId = orders.map(order => order.id);

        const orderLines = await orderLineRepo.find({
            where: { order_id: In(ordersId) },
            relations: ['product', 'product.brand']
        })

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
        
        res.render("admin/dashboard", {top5Brands: Object.fromEntries(top5Brands), top5Products: Object.fromEntries(top5BestSellers), namePage: 'dashboard'});
    },
    getCategoryPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const { result, total, currentPage, totalPages } = await paginate(categoryRepo, page, limit);
        res.render("admin/category", { categories: result, total, currentPage, totalPages, namePage: 'category' });
    },
    getAccountPage: async (req, res, next) => {
        console.log(req.query);
        const page = req.query.page || 1;
        const limit = req.query.limit || process.env.PER_PAGE;
        const { result, total, currentPage, totalPages } = await paginateAccount(userRepo, page, limit);
        if (Object.keys(req.query).length === 0) {
            res.render("admin/account", { users: result, total, currentPage, totalPages, namePage: 'account' });
        } else {
            res.json({ users: result, total, currentPage, totalPages, namePage: 'account' })
        }
    },
    getAccountById: async (req, res, next) => {
        const data = await userRepo.findOne({
            where: { id: req.params.id }
        });
        const addr = await addressRepo.findOne({
            where: { user_id: data.id }
        })
        data.address = addr?.address;
        data.phone = addr?.phone;
        res.json(data);
    },
    postBanAccount: async (req, res, next) => {
        try {
            const userId = parseInt(req.body?.id);
            const existingUser = await userRepo.findOne({
                where: { id: userId }
            });
            if (!existingUser) {
                console.log(`User with ID ${userId} not found`);
                return res.status(404).json({ message: `User with ID ${userId} not found` });
            }
            if (existingUser.role === 'admin') {
                console.log(`Cannot lock admin`);
                return res.status(404).json({ message: `Cannot lock admin` });
            }
            await userRepo.update(userId, { locked: !existingUser.locked });

            console.log(`User with ID ${userId} locked successfully`);
            res.status(200).json({ message: `User with ID ${userId} locked successfully` });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    postDeleteAccount: async (req, res, next) => {
        try {
            const userId = parseInt(req.body?.id);
            const existingUser = await userRepo.findOne({
                where: { id: userId }
            });
            if (!existingUser) {
                console.log(`User with ID ${userId} not found`);
                return res.status(404).json({ message: `User with ID ${userId} not found` });
            }
            if (existingUser.role === 'admin') {
                console.log(`Cannot delete admin`);
                return res.status(404).json({ message: `Cannot delete admin` });
            }
            await userRepo.update(userId, { deleted: !existingUser.deleted });

            console.log(`User with ID ${userId} deleted successfully`);
            res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    postAddAccount: async (req, res, next) => {
        console.log(req.body);
        console.log(req.file);
        if (req.body.password !== req.body.repeatPassword) {
            return res.status(404).json({ message: `Password does not match, please enter password again`, status: 'fail' });
        }
        const user = await userRepo.findOneBy({ email: req.body.email });
        if (user) {
            return res.status(404).json({ message: `Email is already exist`, status: 'fail' });
        }
        const hashedPwd = await hashPwd(req.body.password);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPwd,
            role: req.body.role,
            avatar: req.file.path
        };
        await userRepo.save(newUser);
        res.status(200).json({ message: `Add user successfully`, status: 'success' })
    }
}