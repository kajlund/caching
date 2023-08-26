class QueryParser {
  static parseFilter(filterExpr) {
    // Just do fieldname=value for now
    const filter = filterExpr ? filterExpr.trim() : null
    const result = {}
    const items = filter ? filter.split(',') : []
    items.forEach((item) => {
      const field = item.substr(0, item.indexOf('='))
      const val = item.substr(item.indexOf('=') + 1)
      result[field] = val
    })
    return result
  }

  static parseSort(sortExpr) {
    const sort = sortExpr ? sortExpr.trim() : null
    const result = []
    const items = sort ? sort.split(',') : []
    items.forEach((item) => {
      if (item.indexOf('-') === 0) {
        result.push({ column: item.substr(1), order: 'desc' })
      } else {
        result.push({ column: item })
      }
    })

    return result
  }
}

module.exports = QueryParser
