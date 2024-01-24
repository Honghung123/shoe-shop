const paginate = async (repo, page, limit) => {
    const skip = (page - 1) * limit;
    const [result, total] = await repo.findAndCount({take: limit, skip});
    const totalPages = Math.ceil(total/limit);
    return {result, total, totalPages, currentPage: page}
}
module.exports = paginate;