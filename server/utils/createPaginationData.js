module.exports = ({total, page, perPage})=> {
    const totalPages = Math.ceil(total / perPage);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
        total,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
        perPage,
    }
}