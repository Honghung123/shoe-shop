const { In, Between } = require("typeorm");
const { productRepo, orderRepo, categoryRepo, userRepo, addressRepo, brandRepo, orderLineRepo, sizeRepo, imageRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
const paginateAccount = require("../utils/paginateAccount");
const { hashPwd } = require('../utils/hashPassword');
require("dotenv").config();

module.exports = {
    getProductPage: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            const brands = await brandRepo.find();
            const categories = await categoryRepo.find();
            const sizes = await sizeRepo.find();
            const conditions = { deleted: false };
            const relations = ['category']
            const order = { id: 'ASC' };
            const { result, total, currentPage, totalPages } = await paginate(productRepo, page, limit, relations, order, conditions);
            for (let i = 0; i < result.length; i++) {
                const productImage = await imageRepo.findOne({ where: { product_id: result[i].id } })
                if (productImage) {
                    result[i].image = productImage.image;
                }
            }
            console.log(result);
            if (Object.keys(req.query).length === 0) {
                return res.render("admin/product", {
                    products: result,
                    total,
                    currentPage,
                    totalPages,
                    brands,
                    categories,
                    sizes,
                    namePage: 'product',
                    user: req.user
                });
            } else {
                res.json({ products: result, total, currentPage, totalPages, brands, categories, sizes, namePage: 'product' })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getOrderPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 7;
        const relations = ['user'];
        const order = { id: 'ASC' };
        const conditions = null;
        const { result, total, currentPage, totalPages } = await paginate(orderRepo, page, limit, relations, order, conditions);
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            const createdAt = new Date(result[i].created_at)
            const created_at = `${createdAt.getDate()} -${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`
            console.log(createdAt);
            result[i].created_at = created_at
        }
        if (Object.keys(req.query).length === 0) {
            res.render("admin/order", {
                namePage: 'order',
                orders: result,
                total,
                currentPage,
                totalPages,
                user: req.user
            });
        } else {
            res.json({ namePage: 'order', orders: result, total, currentPage, totalPages });
        }

    },
    getDashboardPage: async (req, res) => {
        // total sales
        const ordersSale = await orderRepo.find();
        let totalSales = 0;
        for (let i of ordersSale) {
            totalSales += parseFloat(i.total);
        }
        console.log('totalSales', totalSales);

        // // users
        // const users = await userRepo.find({
        //     where: { deleted: false }
        // });
        // console.log('users', users.length);

        // // Products
        // const products = await productRepo.find({
        //     where: {deleted: false}
        // })
        // console.log('product', products.length);

        // top 5 brand revenue
        
        
        


        // top 5 product best-seller



        // top 5 brand number of sold

        const totalUsers = await userRepo.count({where: {deleted: false}});
        const numOfProducts = await productRepo.count({where: {deleted: false}})

        res.render("admin/dashboard", {
            namePage: 'dashboard',
            user: req.user,
            totalUsers,
            totalSales,
            numOfProducts,
        });
    },
    getCategoryPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        console.log(page, limit);
        const relations = null;
        const condition = null;
        const order = { id: 'ASC' }
        // const order = null;
        const { result, total, currentPage, totalPages } = await paginate(categoryRepo, page, limit, relations, order, condition);
        if (Object.keys(req.query).length === 0) {
            res.render("admin/category", {
                categories: result,
                total,
                currentPage,
                totalPages,
                namePage: 'category',
                user: req.user
            });
        } else {
            res.json({ categories: result, total, currentPage, totalPages, namePage: 'category' })
        }

    },
    getAccountPage: async (req, res, next) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || process.env.PER_PAGE_ACCOUNT;
        const { result, total, currentPage, totalPages } = await paginateAccount(userRepo, page, limit);
        if (Object.keys(req.query).length === 0) {
            res.render("admin/account", {
                users: result,
                total, currentPage,
                totalPages,
                namePage: 'account',
                user: req.user
            });
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