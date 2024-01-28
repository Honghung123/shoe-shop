const jwt = require('jsonwebtoken');
const { accountRepo } = require('../dbConfig');
module.exports = {
    grantAccess: async (req, res) => {
        const {email} = req.body;
        console.log("Granting access");
        console.log(email, process.env.RECEIVE_MONEY_EMAIL);
        if(email == process.env.RECEIVE_MONEY_EMAIL){
            const token = jwt.sign({permission: 'get account info'}, process.env.JWT_SECRET_KEY);
            return res.json(token)
        }
        res.status(403).json({message: 'Permission denied'})
    },
    getAccountInfo: async (req, res) => {
        const token = req.headers.authorization;
        const {id} = req.params;
        console.log(token);
        console.log("id: ", id);
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(permission = 'get account info'){
                const account = await accountRepo.findOne({where: {id}})
                res.json(account)
            } else{
                res.status(403).json({message: 'Permission denied'})
            }
        } else{
            res.status(401).json({message: 'Unauthorized'})
        }
    }
}