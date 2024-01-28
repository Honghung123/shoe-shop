const { categoryRepo, productRepo } = require("../config/db.config");
const paginate = require("../utils/paginate");
module.exports = {
  addCategory: async (req, res, next) => {
    const { name } = req.body;
    const newCateogry = await categoryRepo.save({ name });
    console.log(newCateogry);
    res.status(201).json(newCateogry);
  },
  updateCategory: async (req, res, next) => {
    const { id, name } = req.body;
    console.log(id, name);
    const categoryToUpdate = await categoryRepo.findOne({ where: { id } });
    if (!categoryToUpdate) {
      res.status(400).json(`Not found any category with id = ${id}`);
    }
    categoryToUpdate.name = name;
    const category = await categoryRepo.save(categoryToUpdate);
    console.log(category);
    res.status(200).json(category);
  },
  deleteCategory: async (req, res, nex) => {
    try {
      const { id } = req.params;
      const products = await productRepo.find({ where: { cat_id: id } });
      if (products) {
        res.json({ message: "Can not delete category has products" });
      }
      await categoryRepo.delete(id);
      res.json({mesage: "Category deleted"});
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
