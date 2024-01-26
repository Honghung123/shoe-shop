const { categoryRepo, brandRepo, productRepo, imageRepo, stockRepo, sizeRepo, saleRepo } = require('../config/db.config');
const { MoreThan, Equal, Between } = require('typeorm');
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
    for (let i of categories) {
      if (i.id === parseInt(req.query?.category)) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    }

    let whereCondition = {};
    if (parseInt(req.query?.category)) {
      whereCondition = { cat_id: parseInt(req.query?.category) };
    }

    const brands = await brandRepo.find();

    const page = req.query.page || 1;
    const limit = req.query.limit || process.env.PER_PAGE_PRODUCT;

    const skip = (page - 1) * limit;
    const [result, total] = await productRepo.findAndCount({
      take: limit,
      skip,
      where: whereCondition
    });
    const totalPages = Math.ceil(total / limit);

    for (let i = 0; i < result.length; i++) {
      const image = await imageRepo.findOne({
        where: { product_id: result[i].id }
      });
      result[i].image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: result[i].cat_id }
      });
      result[i].cat_name = cat.name;
      const sale = await saleRepo.findOne({
        where: {product_id: result[i].id}
      })
      if (sale !== null) {
        result[i].isSale = true;
        result[i].percent = sale.percent;
      } else {
        result[i].isSale = false;
      }
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
      currentPage: page
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
    const currentDateOrigin = new Date();
    const currentDateOnly = new Date(currentDateOrigin.toISOString().split('T')[0]);
    let sales = await saleRepo.find({
      where: { expire: MoreThan(currentDateOrigin) }
    });
    const saleToday = await saleRepo.find({
      where: {
        expire: Between(
          currentDateOnly,
          new Date(currentDateOnly.getTime() + (24 * 60 * 60 * 1000 - 1))
        )
      }
    });
    sales = sales.concat(saleToday);
    
    for (let i of sales) {
      const product = await productRepo.findOne({
        where: { id: i.product_id}
      })
      const image = await imageRepo.findOne({
        where: { product_id: product.id }
      });
      product.image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: product.cat_id }
      });
      product.cat_name = cat.name;
      i.product = product;
    }
    for (let i of saleToday) {
      const product = await productRepo.findOne({
        where: { id: i.product_id}
      })
      const image = await imageRepo.findOne({
        where: { product_id: product.id }
      });
      product.image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: product.cat_id }
      });
      product.cat_name = cat.name;
      product.price_discount = Math.ceil(product.price * parseInt(100 - i.percent) / 100.0);
      i.product = product;
    }

    console.log(sales);
    console.log(saleToday);

    res.render("client/discount", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'discount',
      sales,
      saleToday
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
    const sale = await saleRepo.findOne({
      where: {product_id: product.id}
    })
    if (sale !== null) {
      product.isSale = true;
      product.percent = sale.percent;
    } else {
      product.isSale = false;
    }
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
      const sale = await saleRepo.findOne({
        where: {product_id: i.id}
      })
      if (sale !== null) {
        i.isSale = true;
        i.percent = sale.percent;
      } else {
        i.isSale = false;
      }
    }
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
