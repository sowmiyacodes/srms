function applyPagination(query, page = 1, limit = 20) {

    page = Number(page);
    limit = Number(limit);

    if (page < 1) page = 1;

    if (limit < 1) limit = 20;

    const offset = (page - 1) * limit;

    query.limit(limit).offset(offset);
}

module.exports = applyPagination;