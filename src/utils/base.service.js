/*
 * Base service class
 * Implements reusable standard CRUD functionality
 */

const { InternalServerError, NotFoundError } = require('./errors')
const QueryParser = require('./queryparser')

class BaseService {
  constructor(repo) {
    this.repo = repo
  }

  _parseQuery(query) {
    query = query || {}
    let { filter, sort, limit, skip } = query
    filter = filter ? QueryParser.parseFilter(filter) : this.repo.defaultQuery.filter
    sort = sort ? QueryParser.parseSort(sort) : this.repo.defaultQuery.sort
    limit = parseInt(limit) || this.repo.defaultQuery.limit
    skip = parseInt(skip) || this.repo.defaultQuery.skip

    return {
      filter,
      sort,
      limit,
      skip,
    }
  }

  async listItems(query) {
    const qry = this._parseQuery(query)
    const result = await this.repo.query(qry)

    return {
      success: true,
      msg: `Returned ${result.length} items`,
      query: qry,
      count: result.length,
      data: [...result],
    }
  }

  async getItemById(id) {
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`Item with id: ${id} was not found`)

    return {
      success: true,
      msg: `Found item: ${found[this.repo.descField]}`,
      data: found,
    }
  }

  async createItem(postData) {
    // Format posted data
    const itemData = this.validate(postData)
    // Create item
    const result = await this.repo.createOne(itemData)

    return {
      success: true,
      msg: `Created item: ${result[this.repo.descField]}`,
      data: result,
    }
  }

  async updateItem(id, postData) {
    // Verify place exists
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`Item with id: ${id} was not found`)
    // Format posted data
    const itemData = this.validate(postData)
    // Update item
    const result = await this.repo.updateOne(id, itemData)

    return {
      success: true,
      msg: `Updated place: ${result[this.repo.descField]}`,
      data: result,
    }
  }

  async deleteItem(id) {
    // Ensure it exists
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`Item with id: ${id} was not found`)
    // Delete place
    const result = await this.repo.deleteOne(id)
    if (!result) throw new InternalServerError(`Item with id: ${id} could not be deleted`)

    return {
      success: true,
      msg: `Deleted item: ${result[this.repo.descField]}`,
      data: result,
    }
  }

  validate() {
    return {}
  }
}

module.exports = BaseService
