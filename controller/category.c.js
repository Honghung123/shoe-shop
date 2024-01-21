const {categoryRepo, productRepo} = require('../config/db.config');
const paginate = require('../utils/paginate');
module.exports = {
  addCategory: async (req, res, next) => {
    const {name} = req.body;
    await categoryRepo.save({name})
    res.redirect('admin/category')
    
  },
  updateCategory: async (req, res, next) => {
    const {id, name} = req.body;
    const categoryToUpdate = await categoryRepo.findOne({where: {id}})
    categoryToUpdate.name = name;
    const category = await categoryRepo.save(categoryToUpdate);
    console.log(category);
    res.redirect('/admin/category')
  },
  deleteCategory: async (req, res, nex) => {
    try {
        const {id} = req.params;
        if(productRepo.find({where: {cat_id: id}})){
          res.local.msg = 'Can not delete category has product'
          res.redirect('/admin/category')
        }
        await categoryRepo.delete(id);
        res.redirect('/admin/categgory')
    } catch (error) {
        console.log(error);
        res.redirect('/admin/category')
    }
  }
  
};
