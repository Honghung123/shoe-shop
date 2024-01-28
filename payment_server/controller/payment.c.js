const renderLoginPayment = (req, res) => {
    res.render('login');
}

const renderRegisterPayment = (req, res) => {
  res.render("register");
};

const renderPayment = (req, res) => {
    res.render('payment');
}

const renderInvoice = (req, res) => {
    res.render('invoice');
}

const postPaymentLogin = (req, res) => {
  const code = req.body.code;
  const userId = req.body.id;
};

const postPaymentRegister = (req, res) => {
  const code = req.body.pincode;
  const recode = req.body.repincode;
};
 
module.exports = {
  renderLoginPayment,
  renderRegisterPayment,
  renderPayment,
  renderInvoice,

  postPaymentLogin,
  postPaymentRegister, 
};