const { hashPwd } = require("../../utils/hashPassword");
const { accountRepo, transactionRepo } = require("../dbConfig");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const renderLoginPayment = (req, res) => {
    const {callbackUrl, transactionId} = req.query;
    console.log(callbackUrl);
    res.render('login', {callbackUrl, transactionId});
}


const renderRegisterPayment = (req, res) => {
  const {userId, callbackUrl} = req.query;

  res.render("register", {userId, callbackUrl});
};

const renderPayment = async  (req, res) => {
  const {callbackUrl, transactionId} = req.query;
  const transaction = await transactionRepo.findOne({
    where: {id: transactionId},
    relations: ['sender']
  })
  console.log("Transaction", transaction);
  res.render('payment', {callbackUrl, transaction});
  
} 

const postPaymentLogin = async (req, res) => {
  const {transactionId, callbackUrl} = req.query;
  console.log("Post login page" , transactionId);
  const {code, id} = req.body;
  const transaction = await transactionRepo.findOne({
    where: {id: transactionId},
    relations: ['sender']
  })
  console.log(transaction);
  const cartLines = transaction.description.split(',');
  console.log(callbackUrl);
  const account = await accountRepo.findOne({where: {id: transaction.sender.id}})
  if(!account){
    res.status(400).json({message: 'Account did not exist'})
  }
  const match = await bcrypt.compare(code, account.pin_code)
  if(!match){
    // const showMessage = () => alert('Incorrect pin code')
    res.status(400).json({message: 'Incorrect pin code'});
    
  } else{
    const token = jwt.sign({cartLinesId: cartLines, permission: 'complete transaction', transactionId: transactionId}, process.env.JWT_SECRET_KEY);
    console.log(jwt.decode(token));
    // res.redirect(`${callbackUrl}?token=${token}`)
    res.json({callbackUrl, token});
  }
};


const postPaymentRegister = async (req, res) => {
  const INIT_BALANCE = 5000000;
  
  const {id, code} = req.body;
  console.log("Userid", id);
  const {callbackUrl} = req.query;
  console.log("callbackUrl", callbackUrl);
  const hashedPin = await hashPwd(code);
  let account =  await accountRepo.findOne({where: {id}});
  if(account){
    return res.status(400).json({message: 'Account already exist'});
  } 
  account = await accountRepo.save({id, pin_code: hashedPin, balance: INIT_BALANCE})
  // res.json(account);
  if(callbackUrl){
    res.redirect(callbackUrl)
  } else{
    res.redirect('https://localhost:3000/account')
  }
};
 
module.exports = {
  renderLoginPayment,
  renderRegisterPayment,
  renderPayment, 

  postPaymentLogin,
  postPaymentRegister, 
};