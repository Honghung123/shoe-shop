const {userRepo} = require('../config/db.config');
const asyncWrapper = require('../middleware/async-wrapper');
const hashPwd = require('../utils/hashPassword');
const renderHomepage = (req, res) => {
    res.render('client/home');
}
const register = asyncWrapper(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.locals.message = 'You must fill in all information';
        return res.render('register');
    }
    const user = await userRepo.findOneBy({email: email});
    if(user){
        res.locals.message = 'Email already in use';
        return res.render('register');
    }
    const hashedPwd = await hashPwd(password);
    await userRepo.save({...req.body, password: hashedPwd, role: 'customer'});
    res.redirect('/login')
})

const renderRegister =  (req, res) => {
    res.render('register')
}
const renderLogin = (req, res) => {
    res.render('login')
}
module.exports = {renderLogin, renderRegister, register, renderHomepage}