/*
 * Places repository. Customized data-access module
 */

const db = require('../../db')

class PlaceRepository {
  async searchPlace(search) {
    const expr = search + '%'
    const places = await db('places')
      .whereILike('name_sv', expr)
      .orWhereILike('name_fi', expr)
      .orWhereILike('province_sv', expr)
      .orWhereILike('province_fi', expr)
    return places
  }
}

module.exports = new PlaceRepository()
