const { In } = require("typeorm");
const {
  productRepo,
  sizeRepo,
  categoryRepo,
  imageRepo,
  brandRepo,
  stockRepo,
  orderRepo,
  orderLineRepo,

} = require("../config/db.config");
const paginate = require("../utils/paginate");
const fs = require("fs");
module.exports = {
  getProductDetails: async (req, res) => {
    const { id } = req.params;
    const product = await productRepo.findOne({
      where: { id },
      relations: ["brand", "category"],
    });
    const stocks = await stockRepo.find({
      where: { product_id: id },
      relations: ["size"],
    });
    const images = await imageRepo.find({
      where: { product_id: id },
    });
    res.json({ product, stocks, images });
  },
  findProducts: async (req, res, next) => {
    let { brands, categories, minPrice, maxPrice, productName } = req.query;
    const sort = req.query.sort || 0;
    const query = productRepo.createQueryBuilder("product");
    if (productName) {
      query.andWhere("product.name LIKE %:name%", { productName });
    }
    if (minPrice) {
      query.andWhere("product.price > :minPrice", { minPrice });
    }
    if (maxPrice) {
      query.andWhere("product.price < :maxPrice", { maxPrice });
    }
    if (brands) {
      query.andWhere("product.brand_id IN (:...brands)", { brands });
    }
    if (categories) {
      query.andWhere("product.cat_id IN(:...categories)", { categories });
    }
    //Sort in price ascending order
    if (sort == 0) {
      query.orderBy("product.price", "ASC");
    } else {
      query.orderBy("product.price", "DESC");
    }
    query.andWhere("product.is_delete = 0");
    if (req.user.role != "admin") {
      query.innerJoin("product.stock", "stock").where("stock.quantity > 0");
    }

    const filteredProducts = await query.getMany();

    res.json(filteredProducts);
  },

  addProduct: async (req, res, next) => {
    try {
      const { name, description, brandId, catId, price, sizes } = req.body;
      const idMax = await productRepo.find({
        order: { id: 'DESC' },
        take: 1
      })
      const product = await productRepo.save({
        id: idMax[0].id + 1,
        name,
        price,
        description,
        brand_id: brandId,
        cat_id: catId,
      });

      if (sizes) {
        if (Array.isArray(sizes)) {
          for (let i = 0; i < sizes.length; i++) {
            const sizeInfo = sizes[i].split("-");
            let stock = await stockRepo.save({
              size_id: sizeInfo[0],
              quantity: sizeInfo[1],
              product_id: product.id,
            });
          }
        } else {
          const sizeInfo = sizes.split("-");
          let stock = await stockRepo.save({
            size_id: sizeInfo[0],
            quantity: sizeInfo[1],
            product_id: product.id,
          });
        }
      }
      const files = req.files;
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const productImage = await imageRepo.save({
          product_id: product.id,
          image: files[i].path,
        });
        images.push(productImage);
      }
      res.status(201).json({ product, images });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateProduct: async (req, res, next) => {
    const id = req.params.id;
    const { name, description, brandId, catId, price, sizes } = req.body;
    let productToUpdate = await productRepo.findOne({ where: { id } });
    productToUpdate = {
      ...productToUpdate,
      name,
      description,
      price,
      brand_id: brandId,
      cat_id: catId,
    };
    await stockRepo.delete({ product_id: parseInt(id) });
    if (sizes) {
      if (Array.isArray(sizes)) {
        for (let i = 0; i < sizes.length; i++) {
          const sizeInfo = sizes[i].split("-");
          let stock = await stockRepo.save({
            size_id: sizeInfo[0],
            quantity: sizeInfo[1],
            product_id: productToUpdate.id,
          });
        }
      } else {
        const sizeInfo = sizes.split("-");
        let stock = await stockRepo.save({
          size_id: sizeInfo[0],
          quantity: sizeInfo[1],
          product_id: productToUpdate.id,
        });
      }
    }
    const files = req.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const productImage = await imageRepo.save({
        product_id: productToUpdate.id,
        image: files[i].path,
      });
      images.push(productImage);
    }
    const updatedProduct = await productRepo.save(productToUpdate);
    res.status(200).json(updatedProduct);
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      let productToDelete = await productRepo.findOne({ where: { id } });
      if (productToDelete) {
        productToDelete.deleted = true;
        await productRepo.save(productToDelete);
      } else {
        res.status(400).json({ message: "Not found product" });
      }
      res.json({ message: "Product is deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  topFiveProduct: async (req, res) => {
    const { type } = req.query;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    let ordersInPeriod = null;
    if (type == 'month') {
      ordersInPeriod = await orderRepo
        .createQueryBuilder("order")
        .where(`EXTRACT(YEAR FROM order.created_at) = :currentYear`, {
          currentYear
        })
        .getMany();
    } else if (type === 'year') {
      ordersInPeriod = await orderRepo
        .createQueryBuilder("order")
        .where(`EXTRACT(YEAR FROM order.created_at) = :currentYear`, {
          currentYear,
        })
        .getMany();
    }
    if (!ordersInPeriod) {
      return res.status(400).json({ message: 'Invalid request' })
    }
    const ordersInPeriodId = ordersInPeriod.map((order) => order.id);
    const orderLinesInPeriod = await orderLineRepo.find({
      where: { order_id: In(ordersInPeriodId) },
      relations: ["product"],
    });


    let bestSellerProductMap = new Map();
    for (const orderLine of orderLinesInPeriod) {
      const productName = orderLine.product.name;
      const quantity = orderLine.quantity;
      if (bestSellerProductMap.has(productName)) {
        bestSellerProductMap.set(
          productName,
          bestSellerProductMap.get(productName) + quantity
        );
      } else {
        bestSellerProductMap.set(productName, quantity);
      }
    }
    const bestSellersArray = Array.from(bestSellerProductMap.entries());
    // Sort the array in descending order based on total quantity sold
    bestSellersArray.sort((a, b) => b[1] - a[1]);
    // Limit the result to the top 5 products
    const top5BestSellers = bestSellersArray.slice(0, 5);
    res.json({ products: top5BestSellers })
  },

};
