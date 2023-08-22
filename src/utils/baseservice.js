class BaseService {
  constructor(filter = {}, sort = '', limit = 50, skip = 0) {
    this.defaultQuery = {
      filter: filter,
      sort: sort || [],
      limit,
      skip,
    }
  }
  parseQuery(query) {
    query = query || {}
    let { filter, sort, limit, skip } = query
    // TODO: Add parsing of filter and sort
    filter = filter || this.defaultQuery.filter
    sort = sort || this.defaultQuery.sort
    limit = limit || this.defaultQuery.limit
    skip = skip || this.defaultQuery.skip

    return {
      filter,
      sort,
      limit,
      skip,
    }
  }
}

module.exports = BaseService
