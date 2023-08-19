/*
 * Places data-access layer
 */

const db = require('../../db')

class PlaceDAL {
  async getList() {
    const places = await await db('places').orderBy([{ column: 'name_sv', order: 'asc' }])
    return places
  }

  async findByID(id) {
    const place = await db('places').where({ id }).first()
    return place
  }

  async find(search) {
    const expr = search + '%'
    const places = await db('places')
      .whereILike('name_sv', expr)
      .orWhereILike('name_fi', expr)
      .orWhereILike('province_sv', expr)
      .orWhereILike('province_fi', expr)
    return places
  }

  async create(data) {
    const place = await db('places').insert(data).returning('*')
    return place
  }

  async update(id, data) {
    data.updated_at = new Date().toISOString()
    const result = await db('places').where('id', id).update(data).returning('*')
    return result.length ? result[0] : null
  }

  async deleteOne(id) {
    const result = await db('places').where('id', id).del(['*'])
    return result // object or empty array
  }
}

module.exports = new PlaceDAL()
