const {userRepo} = require('../../config/db.config');
const paginate = require('../../utils/paginate');
module.exports = {
  getAccountPage: async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const {result, total, currentPage, totalPages} = await paginate(userRepo, page, limit);
    res.render("admin/account", {users: result, total, currentPage, totalPages});
  },
};
