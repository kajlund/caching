const db = require('../../db')

class PlaceDAO {
  async getList() {
    const places = await await db('places').orderBy([{ column: 'name_sv', order: 'asc' }])
    return places
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

  async findByID(id) {
    const place = await db('places').where({ id }).first()
    return place
  }

  async create(data) {
    const [id] = await db('places').insert(data).returning('id')
    return id.id
  }

  async updateById(id, data) {
    data.updated_at = new Date().toISOString()
    const result = await db('places').where('id', id).update(data).returning('*')
    return result.length ? result[0] : null
  }

  async deleteOne(id) {
    const result = await db('places').where('id', id).del(['*'])
    return result // object or empty array
  }
}

module.exports = new PlaceDAO()
