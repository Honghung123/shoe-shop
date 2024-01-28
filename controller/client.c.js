const { async } = require('rxjs');
const { categoryRepo, brandRepo, productRepo, imageRepo, stockRepo, sizeRepo, saleRepo, userRepo, cartLineRepo } = require('../config/db.config');
const { MoreThan, Equal, Not } = require('typeorm');
const cartReview = require('../utils/cartReview');

require('dotenv').config();

module.exports = {
  postProductbyId: async (req, res, next) => {
    const product = await productRepo.findOne({
      where: { id: parseInt(req.body.id) }
    })
    const stock = await stockRepo.find({
      where: {
        product_id: product.id,
        quantity: MoreThan(0)
      }
    })
    for (let i of stock) {
      const size = await sizeRepo.findOne({
        where: { id: i.size_id }
      });
      i.size = size.size
    }
    res.json(stock);
  },
  postQuerySearch: async (req, res, next) => {
    const query = [];
    for (let i of req.body.query.split(' ')) {
      i = i.toLowerCase();
      query.push(i);
    }
    const dataSale = await saleRepo.find();
    const dataProduct = await productRepo.find();
    const curDate = new Date();
    curDate.setHours(curDate.getHours() + 7);
    for (let product of dataProduct) {
      for (let sale of dataSale) {
        if (sale.product_id === product.id && (new Date(sale.expire) > curDate)) {
          product.percent = sale.percent;
          product.price_discount = parseInt(product.price) * (1 - sale.percent / 100.0);
          break;
        }
      }
      if (product?.percent) {
        product.isSale = true;
      } else {
        product.isSale = false;
        product.price_discount = product.price;
      }
    }
    const data = dataProduct.filter(e => {
      for (let i of query) {
        if (!e.name.toLowerCase().includes(i)) {
          return false;
        }
      }
      return true;
    })

    for (let i = 0; i < data.length; i++) {
      const image = await imageRepo.findOne({
        where: { product_id: data[i].id }
      });
      data[i].image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: data[i].cat_id }
      });
      data[i].cat_name = cat.name;
    }

    res.json(data);
  },
  renderHomePage: async (req, res) => {
    const currentDateOrigin = new Date();
    // Đặt giờ theo giờ địa phương
    currentDateOrigin.setHours(currentDateOrigin.getHours() + 7);
    // Lấy danh sách sản phẩm sales >= 15%
    let sales = await saleRepo.find({
      where: {
        expire: MoreThan(currentDateOrigin),
        percent: MoreThan(14)
      },
      order: { product_id: 'ASC' }
    });
    for (let i of sales) {
      const product = await productRepo.findOne({
        where: { id: i.product_id }
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
    const categories = await categoryRepo.find();

    // lấy danh sách sản phẩm mới nhất
    const latest = await productRepo.find({
      order: { id: 'DESC' },
      take: 5
    })
    for (let i of latest) {
      const image = await imageRepo.findOne({
        where: { product_id: i.id }
      });
      i.image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: i.cat_id }
      });
      i.cat_name = cat.name;
      const sale = await saleRepo.findOne({
        where: { product_id: i.id }
      })
      if (sale !== null) {
        i.isSale = true;
        i.percent = sale.percent;
        i.price_discount = Math.ceil(i.price * parseInt(100 - sale.percent) / 100.0);
      } else {
        i.isSale = false;
      }
    }

    const monday = new Date("1 January 2024 00:00:00 GMT+07:00");
    monday.setHours(monday.getHours() + 7);
    const mondayLatest = new Date(currentDateOrigin.setUTCHours(0, 0, 0, 0));
    while ((Math.abs(mondayLatest - monday) / (1000 * 60 * 60 * 24)) % 7 !== 0) {
      mondayLatest.setDate(mondayLatest.getDate() + 1);
    }

    const saleWeek = await saleRepo.find({
      where: {
        expire: Equal(mondayLatest)
      }
    });

    for (let i of saleWeek) {
      const product = await productRepo.findOne({
        where: { id: i.product_id }
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
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/home", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'home',
      categories: categories,
      sales,
      latest,
      saleWeek,
      query: '',
      cartReviews
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

    if (parseInt(req.query?.category)) {
      whereCondition = { cat_id: parseInt(req.query?.category) };
    }

    const brands = await brandRepo.find();

    const page = req.query.page || 1;
    const limit = req.query.limit || process.env.PER_PAGE_PRODUCT;
    const dataSale = await saleRepo.find();
    let dataProduct = await productRepo.find();
    const curDate = new Date();
    curDate.setHours(curDate.getHours() + 7);
    for (let product of dataProduct) {
      for (let sale of dataSale) {
        if (sale.product_id === product.id && (new Date(sale.expire) > curDate)) {
          product.percent = sale.percent;
          product.price_discount = parseInt(product.price) * (1 - sale.percent / 100.0);
          break;
        }
      }
      if (product?.percent) {
        product.isSale = true;
      } else {
        product.isSale = false;
        product.price_discount = product.price;
      }
    }
    const query = [];
    if (req.query.search) {
      for (let i of req.query.search.split(' ')) {
        i = i.toLowerCase();
        query.push(i);
      }

      dataProduct = dataProduct.filter(e => {
        for (let i of query) {
          if (!e.name.toLowerCase().includes(i)) {
            return false;
          }
        }
        return true;
      })
    }

    if (req.query.category) {
      dataProduct = dataProduct.filter(e => e.cat_id === parseInt(req.query.category));
    }

    console.log(dataProduct);
    const total = dataProduct.length;
    const totalPages = Math.ceil(total / limit);

    const result = dataProduct.slice((page - 1) * limit, page * limit)

    for (let i = 0; i < result.length; i++) {
      const image = await imageRepo.findOne({
        where: { product_id: result[i].id }
      });
      result[i].image = image.image;
      const cat = await categoryRepo.findOne({
        where: { id: result[i].cat_id }
      });
      result[i].cat_name = cat.name;
    }
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
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
      currentPage: page,
      query: req.query.search || '',
      cartReviews
    });
  },
  renderCheckoutPage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/checkout", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'more',
      query: '',
      cartReviews
    });
  },
  renderVoucherPage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/voucher", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'voucher',
      query: '',
      cartReviews
    });
  },
  renderFavorPage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/favorite", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'favorite',
      query: '',
      cartReviews
    });
  },
  renderDiscountPage: async (req, res) => {
    const currentDateOrigin = new Date();
    // Đặt giờ theo giờ địa phương
    currentDateOrigin.setHours(currentDateOrigin.getHours() + 7);
    let endTime = new Date(currentDateOrigin);
    endTime.setDate(currentDateOrigin.getDate() + 1);
    endTime.setUTCHours(0, 0, 0, 0);
    let sales = await saleRepo.find({
      where: { expire: MoreThan(currentDateOrigin) }
    });
    const saleToday = await saleRepo.find({
      where: {
        expire: Equal(endTime)
      }
    });
    for (let i of sales) {
      const product = await productRepo.findOne({
        where: { id: i.product_id }
      });
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
    for (let i of saleToday) {
      const product = await productRepo.findOne({
        where: { id: i.product_id }
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

    const page = req.query.page || 1;
    const limit = req.query.limit || process.env.PER_PAGE_DISCOUNT;
    const total = sales.length;
    const totalPages = Math.ceil(total / limit);
    const result = sales.slice((page - 1) * limit, (page - 1) * limit + limit);

    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/discount", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'discount',
      sales: result,
      saleToday,
      currentPage: page,
      totalPages,
      query: '',
      cartReviews
    });
  },
  renderContactPage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/contact", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'more',
      query: '',
      cartReviews
    });
  },
  renderAccountPage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    console.log(req.user);
    const user = await userRepo.findOne({ where: { email: req.user.email } })
    res.render("client/account", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'account',
      query: '',
      cartReviews
    });
  },
  renderDetailsPage: async (req, res) => {
    const product = await productRepo.findOne({
      where: { id: parseInt(req.query.id) }
    })
    const sale = await saleRepo.findOne({
      where: { product_id: product.id }
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
        where: { product_id: i.id }
      })
      if (sale !== null) {
        i.isSale = true;
        i.percent = sale.percent;
      } else {
        i.isSale = false;
      }
    }
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/details", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'detail',
      product,
      images,
      stock,
      suggests,
      query: '',
      cartReviews
    });
  },
  renderCartPage: async (req, res) => {
    const carts = await cartLineRepo.find({
      where: { user_id: req.user.id },
      order: { id: 'DESC' }
    });
    const curDate = new Date();
    curDate.setHours(curDate.getHours() + 7);
    
    for (let i of carts) {
      let product = await productRepo.findOne({
        where: {
          id: parseInt(i.product_id)
        }
      });
      const sale = await saleRepo.findOne({
        where: { product_id: parseInt(i.product_id) }
      });
      if (sale && (new Date(sale.expire) > curDate)) {
        product.isSale = true;
        product.price_discount = parseInt(product.price) * (1 - sale.percent / 100.0);
      } else {
        product.isSale = false
      }
      const image = await imageRepo.findOne({
        where: { product_id: product.id }
      });
      product.image = image.image;
      const size = await sizeRepo.findOne({
        where: {id: i.size_id}
      })
      i.size = size.size;
      i.product = product;
    }

    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/cart", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'cart',
      query: '',
      cartReviews,
      carts
    });
  },
  renderUpdateProfilePage: async (req, res) => {
    let cartReviews = [];
    if (req.isAuthenticated()) {
      cartReviews = await cartReview(req.user.id);
    }
    res.render("client/update-profile", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      curPage: 'profile',
      query: '',
      cartReviews
    });
  },
};
