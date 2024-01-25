const {categoryRepo, productRepo} = require('../config/db.config');
const paginate = require('../utils/paginate');
module.exports = {
  addCategory: async (req, res, next) => {
    const {name} = req.body;
    const newCateogry = await categoryRepo.save({name})
    res.status(201).json(newCateogry)
  },
  updateCategory: async (req, res, next) => {
    const {id, name} = req.body;
    const categoryToUpdate = await categoryRepo.findOne({where: {id}})
    if(!categoryToUpdate){
      res.status(400).json(`Not found any category with id = ${id}`)
    }
    categoryToUpdate.name = name;
    const category = await categoryRepo.save(categoryToUpdate);
    res.status(200).json(category)
  },
  deleteCategory: async (req, res, nex) => {
    try {
        const {id} = req.params;
        const products = productRepo.find({where: {cat_id: id}})
        if(products){
          res.json({message: 'Can not delete category has products'})
        }
        await categoryRepo.delete(id);
        res.json('Category deleted')
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
  }
  
  
};
