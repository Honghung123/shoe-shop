module.exports = {
  renderHomePage: async (req, res) => {
    res.render("client/home");
  },
  renderShoppingPage: async (req, res) => {
    res.render("client/shopping");
  },
  renderCheckoutPage: async (req, res) => {
    res.render("client/checkout");
  },
  renderVoucherPage: async (req, res) => {
    res.render("client/voucher");
  },
  renderFavorPage: async (req, res) => {
    res.render("client/favorite");
  },
  renderDiscountPage: async (req, res) => {
    res.render("client/discount");
  },
  renderContactPage: async (req, res) => {
    res.render("client/contact");
  },
  renderAccountPage: async (req, res) => {
    res.render("client/account");
  },
  renderDetailsPage: async (req, res) => {
    res.render("client/details");
  },
  renderCartPage: async (req, res) => {
    res.render("client/cart");
  },
  renderContactPage: async (req, res) => {
    res.render("client/contact");
  },
};
