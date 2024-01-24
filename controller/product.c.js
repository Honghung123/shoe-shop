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
        let {brands, categories, minPrice, maxPrice, productName} = req.query;
        const sort = req.query.sort || 0
        const query = productRepo.createQueryBuilder('product');
        if(productName){
            query.andWhere('product.name LIKE %:name%', {productName})
        }
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
        query.andWhere('product.is_delete = 0')
        if(req.user.role != 'admin'){
            query.innerJoin('product.stock', 'stock')
                .where('stock.quantity > 0')
        }
        const filteredProducts = await query.getMany();
        res.json(filteredProducts)
    },

    addProduct: async (req, res, next) => {
        try {
            console.log(req.body, req.files);
            const {name, description, brandId, catId} = req.body;
            const product = await productRepo.save({name, price, brand_id: brandId, cat_id: catId});
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
        const id = req.params;
        const {name, description, brandId, catId} = req.body
        let productToUpdate = await productRepo.findOne({where: {id}});
        productToUpdate = {...productToUpdate, name, description, brand_id: brandId, cat_id: catId}
        await productRepo.save(productToUpdate);
        res.redirect('admin/category')
    },
    deleteProduct: async (req, res, next) => {
        const id = req.params;
        let productToDelete = await productRepo.findOne({where: {id}});
        if(productToDelete){
            productToDelete.is_deleted = true;
            await productRepo.findOne('product')
        } else{
            req.session.msg = 'Product not found'
        }
        res.redirect('admin/product')
    }

    
    
    

    
    

}