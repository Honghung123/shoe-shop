const { categoryRepo, brandRepo, productRepo, imageRepo, stockRepo, sizeRepo } = require('../config/db.config');
const paginate = require('../utils/paginate');
const { Not } = require('typeorm');

module.exports = {
  renderHomePage: async (req, res) => {
    const categories = await categoryRepo.find();
    res.render("client/home", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'home',
      categories: categories
    });
  },
  renderShoppingPage: async (req, res) => {
    const categories = await categoryRepo.find();
    const brands = await brandRepo.find();

    const page = req.query.page || 1;
    const limit = req.query.limit || process.env.PER_PAGE_PRODUCT;
    const { result, total, currentPage, totalPages } = await paginate(productRepo, page, limit);
    for (let i = 0; i < result.length; i++) {
      const image = await imageRepo.findOne({
        where: { product_id: result[i].id }
      });
    console.log(result);
      result[i].image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: result[i].cat_id }
      });
      result[i].cat_name = cat.name;
    }

    res.render("client/shopping", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'shop',
      categories: categories,
      brands: brands,
      products: result,
      total,
      totalPages,
      currentPage
    });
  },
  renderCheckoutPage: async (req, res) => {
    res.render("client/checkout", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'more'
    });
  },
  renderVoucherPage: async (req, res) => {
    res.render("client/voucher", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'voucher'
    });
  },
  renderFavorPage: async (req, res) => {
    res.render("client/favorite", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'favorite'
    });
  },
  renderDiscountPage: async (req, res) => {
    res.render("client/discount", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'discount'
    });
  },
  renderContactPage: async (req, res) => {
    res.render("client/contact", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'more'
    });
  },
  renderAccountPage: async (req, res) => {
    res.render("client/account", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'account'
    });
  },
  renderDetailsPage: async (req, res) => {
    const product = await productRepo.findOne({
      where: { id: parseInt(req.query.id) }
    })
    const brand = await brandRepo.findOne({
      where: { id: product.brand_id }
    })
    product.brand = brand.brand_name;
    const images = await imageRepo.find({
      where: { product_id: product.id }
    })
    const stock = await stockRepo.find({
      where: { product_id: product.id }
    })
    for (let i of stock) {
      const size = await sizeRepo.findOne({
        where: { id: i.size_id }
      })
      i.size = size.size
    }
    const suggests = await productRepo.find({
      where: { 
        cat_id: product.cat_id,
        brand_id: product.brand_id,
        id: Not(product.id)
      }
    })
    for (let i of suggests) {
      const image = await imageRepo.findOne({
        where: { product_id: i.id }
      });
      i.image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: i.cat_id }
      });
      i.cat_name = cat.name;
    }
    console.log(product);
    console.log(images);
    console.log(stock);
    console.log(suggests);
    res.render("client/details", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'detail',
      product,
      images,
      stock,
      suggests
    });
  },
  renderCartPage: async (req, res) => {
    res.render("client/cart", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'cart'
    });
  },
};
