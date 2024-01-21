const { error } = require('console');
const {productRepo, sizeRepo, categoryRepo, imageRepo, brandRepo, stockRepo} = require('../config/db.config');
const paginate = require('../utils/paginate');
const fs = require('fs');
module.exports = {
    getProductDetails: async(req, res) => {
        const {id} = req.params;
        const product = await productRepo.findOne({where: {id},
            relations: ['brand', 'category']
        })
        const stocks = await stockRepo.findOne({where: {product_id: id}})
        res.json({product, stocks})
        //redirect by role
        // if(req.user.role === 'admin'){
            
        // }
    },
    findProducts: async (req, res, next) => {
        //brands is array of brand id
        //categories is array of category id
        let {brands, categories, minPrice, maxPrice} = req.query;
        const sort = req.query.sort || 0
        const query = productRepo.createQueryBuilder('product');
        if(minPrice){
            query.andWhere('product.price > :minPrice', {minPrice})
        }
        if(maxPrice){
            query.andWhere('product.price < :maxPrice', {maxPrice})
        }
        if(brands){
            query.andWhere('product.brand_id IN (:...brands)', {brands})
        }
        if(categories){
            query.andWhere('product.cat_id IN(:...categories)', {categories})
        }
        //Sort in price ascending order
        if(sort == 0){
            query.orderBy('product.price', 'ASC')
        } else{
            query.orderBy('product.price', 'DESC')
        }
        const filteredProducts = await query.getMany();
        res.json(filteredProducts)
    },
    getProductsOfCategory: async (req, res, next) => {
        const {catId, page, limit} = req.query;
        const {result, total, currentPage, totalPages} = await paginate(productRepo, page, limit);
        res.json({products: result, total, currentPage, totalPages})
    },
    addProduct: async (req, res, next) => {
        try {
            
            console.log(req.body, req.files);
            const {name, short_des, description, brandId, catId} = req.body;
            let product = {name, price, brand_id: brandId, cat_id: catId}
            
            product = await productRepo.save(product);
            const files = req.files;
            for(let i = 0; i < files.length; i++){
                const productImage = {product_id: product.id, image: files[i].path};
                await imageRepo.save(productImage)
            }
            res.redirect('/admin/product')
        } catch (error) {
            console.log(error);
            res.send('error')
        }
    },
    updateProduct: async (req, res, next) => {
        const {name, description, brandId, catId} = req.body
        let productToUpdate = await productRepo.findOne({where: {id: 2}});
        productToUpdate = {...productToUpdate, name, description, brand_id: brandId, cat_id: catId}
        await productRepo.save(productToUpdate);
        res.redirect('admin/category')
    },
    
    
    

    
    

}