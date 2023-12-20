const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const msg = process.env.NODE_ENV === 'PRODUCT'? null : err.stack
    res.render('error', {statusCode, msg})
}
module.exports = errorHandler;