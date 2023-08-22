class BaseService {
  constructor(repo) {
    this.repo = repo
  }

  parseQuery(query) {
    query = query || {}
    let { filter, sort, limit, skip } = query
    // TODO: Add proper parsing of filter and sort
    filter = filter || this.repo.defaultQuery.filter
    sort = sort || this.repo.defaultQuery.sort
    limit = limit || this.repo.defaultQuery.limit
    skip = skip || this.repo.defaultQuery.skip

    return {
      filter,
      sort,
      limit,
      skip,
    }
  }
}

module.exports = BaseService
