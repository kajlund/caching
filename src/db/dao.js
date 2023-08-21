/*
 * Generic Data Access Singleton for Knex/Postgres
 */
const db = require('./')

class DAO {
  constructor(tableName) {
    this.tableName = tableName
  }

  async archiveOne(id) {
    const result = await db(this.tableName)
      .where('id', id)
      .update({ archived_at: new Date().toISOString() })
      .returning('*')
    return result.length ? result[0] : null
  }

  async query(filter = {}, sort = [], limit = 50, skip = 0) {
    const result = await db(this.tableName).where(filter).orderBy(sort).limit(limit).offset(skip)
    return result
  }

  async findByID(id) {
    const result = await db(this.tableName).where({ id }).first()
    return result
  }

  async createOne(data) {
    const result = await db(this.tableName).insert(data).returning('*')
    return result.length ? result[0] : null
  }

  async updateOne(id, data) {
    data.updated_at = new Date().toISOString()
    const result = await db(this.tableName).where('id', id).update(data).returning('*')
    return result.length ? result[0] : null
  }

  async deleteOne(id) {
    const result = await db(this.tableName).where('id', id).del(['*'])
    return result.length ? result[0] : null // should returned the one deleted or null
  }
}

module.exports = DAO
