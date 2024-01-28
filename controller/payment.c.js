const renderLoginPayment = (req, res) => {
    res.render('login');
}

const renderPayment = (req, res) => {
    res.render('payment');
}

const renderInvoice = (req, res) => {
    res.render('invoice');
}

module.exports = {renderLoginPayment, renderPayment, renderInvoice}