const {categoryRepo} = require('../../config/db.config');
const paginate = require('../../utils/paginate');
module.exports = {
  getCategoryPage: async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const {result, total, currentPage, totalPages} = await paginate(categoryRepo, page, limit);
    res.render("admin/category", {categories: result, total, currentPage, totalPages});
  },
  addCategory: async (req, res, next) => {
    const {name} = req.body;
    await categoryRepo.save({name})
    //render
  },
  updateCategory: async (req, res, next) => {
    const {id, name} = req.body;
    const categoryToUpdate = await categoryRepo.findOne({id})
    categoryToUpdate.name = name;
    await categoryRepo.save(categoryToUpdate);
    //render
  }
  
};
