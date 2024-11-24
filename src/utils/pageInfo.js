exports.pageInfo = (query, totalData) => {
  let limit = parseInt(query.limit) || 3;
  let offset = parseInt(query.limit) || 0;
  let page = parseInt(query.page) || 1;
  offset = page * limit - limit;
  const pageInfo = {};

  const totalPage = Math.ceil(totalData[0].count / limit);
  pageInfo.totalData = totalData[0].count;
  pageInfo.currentPage = page;
  pageInfo.totalPage = totalPage;
  pageInfo.limit = limit;
  pageInfo.offset = offset;
  pageInfo.nextPage = page < totalPage ? page + 1 : null;
  pageInfo.prevPage = page > 1 ? page - 1 : null;

  return pageInfo;
};
