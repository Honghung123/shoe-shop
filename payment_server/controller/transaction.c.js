const { transactionRepo, accountRepo } = require("../dbConfig")
const jwt = require('jsonwebtoken')
const completeTransaction = async (req, res) => {
    try {

        const {token} = req.body;
        console.log("Token from ", token);
        if(!token){
            res.status(401).json({message: 'Unauthorized: missing access token'})
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {permission} = payload
        if(permission == 'complete transaction'){
            const {transactionId } = payload;
            const transaction = await transactionRepo.findOne({where: {id: transactionId}});
            transaction.status = 'Completed',
            await transactionRepo.save(transaction);
            res.json(transaction);
        } else{
            res.status(403).json({message: 'Permission denied'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
}
const createTransaction = async (req, res) => {
    const {senderId, amount, receiverId, callbackUrl, cartLines} = req.body;
    console.log("Cart lines", cartLines);
    const description = cartLines.join(',')
    const account = await accountRepo.findOne({where: {id: senderId}});
    if(amount < 0){
      res.status(400).json('Amount must be > 0')
    }
    const transaction = await transactionRepo.save({receiver_id: receiverId, sender_id: senderId, amount, status: 'processing', description});
    console.log("New trasaction", transaction);
    res.json(transaction)
}
module.exports = {createTransaction, completeTransaction}

