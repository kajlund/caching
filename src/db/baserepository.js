/**
 * Base repository to implement shared functionality
 * TODO: Refactor out all Knex-related to a DAOKnex class
 */
const db = require('./')

class BaseRepository {
  constructor(config) {
    const { table, filter, sort, limit, skip } = config
    this.defaultQuery = {
      filter: filter || {},
      sort: sort || [],
      limit: limit || 50,
      skip: skip || 0,
    }

    this.db = db
    this.table = table
  }

  async archiveOne(id) {
    const result = await this.db(this.table)
      .where('id', id)
      .update({ archived_at: new Date().toISOString() })
      .returning('*')
    return result.length ? result[0] : null // Returns archived one or null
  }

  async createOne(data) {
    const result = await this.db(this.table).insert(data).returning('*')
    return result.length ? result[0] : null // Return created one or null
  }

  async deleteOne(id) {
    const result = await this.db(this.table).where('id', id).del(['*'])
    return result.length ? result[0] : null // Returns deleted one or null
  }

  async findByID(id) {
    const result = await this.db(this.table).where({ id }).first()
    return result
  }

  async query(query) {
    const { filter, sort, limit, skip } = query
    const result = await this.db(this.table).where(filter).orderBy(sort).limit(limit).offset(skip)
    return result
  }

  async updateOne(id, data) {
    data.updated_at = new Date().toISOString()
    const result = await this.db(this.table).where('id', id).update(data).returning('*')
    return result.length ? result[0] : null // Returns updated object or null
  }
}

module.exports = BaseRepository
