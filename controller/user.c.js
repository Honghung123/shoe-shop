const { productRepo, orderRepo, categoryRepo, userRepo, brandRepo, orderLineRepo, addressRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
    updateInfor: async (req, res) => {
        try {
            console.log(req.body, req.file);
            const {id} = req.params;
            const {phone, address, username} = req.body;
            const userToUpdate = await userRepo.findOne({where: {id}});
            const defaultAddress = await addressRepo.findOne({where: {user_id: id, is_default: true}});
            console.log(defaultAddress);
            if(!defaultAddress){
                await addressRepo.save({address, phone, user_id:id, is_default: true})
            } else{
                defaultAddress.phone = phone;
                defaultAddress.address = address;
                await addressRepo.save(defaultAddress);
            }
            userToUpdate.username = username;
            if(req?.file?.path){
                userToUpdate.avatar = req.file.path
            }
            const user = await userRepo.save(userToUpdate);
            res.json(user)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'})
        }
    }
}
