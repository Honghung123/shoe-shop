const paginate = async (repo, page, limit, relations, order, conditions) => {
    const skip = (page - 1) * limit;
    let criteria = {take: limit, skip};
    if(relations){
        criteria = {...criteria, relations: relations}
    }
    if(order){
        criteria = {...criteria, order: order}
    }
    if(conditions) {
        criteria = {...criteria, where: conditions}
    }
    console.log(criteria);
    const [result, total] = await repo.findAndCount(criteria);
    const totalPages = Math.ceil(total/limit);
    return {result, total, totalPages, currentPage: page}
}
module.exports = paginate;