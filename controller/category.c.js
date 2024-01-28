const { categoryRepo, productRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
  addCategory: async (req, res, next) => {
    const { name } = req.body;
    const newCategory = await categoryRepo.save({ name });
    res.json({newCategory});
  },
  updateCategory: async (req, res, next) => {
    const { id, name } = req.body; 
    const categoryToUpdate = await categoryRepo.findOne({ where: { id } });
    if (!categoryToUpdate) {
      res.json(`Not found any category with id = ${id}`);
    }
    categoryToUpdate.name = name;
    const category = await categoryRepo.save(categoryToUpdate); 
    res.json(category);
  },
  deleteCategory: async (req, res, nex) => {
    try {
      const { id } = req.params;
      const products = await productRepo.find({ where: { cat_id: id } });
      if (products.length != 0) {
        res.json({ message: "Can not delete category has products" });
      } else {
        await categoryRepo.delete(id);
        res.json({message: ""});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  validateCategoryName: async (req, res) => {
    const {name, id} = req.body;
    console.log("Cat name", name);
    const cat = await categoryRepo.findOne({where: {name}});
    if((cat && (id === undefined || id != cat.id))){
      return res.status(400).json({message: 'Category already exist'})
    }
    res.json({message: ''})
  }
};
