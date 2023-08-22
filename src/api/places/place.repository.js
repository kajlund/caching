/*
 * Places repository. Customized data-access module
 */

const BaseRepository = require('../../db/baserepository')

class PlaceRepository extends BaseRepository {
  async searchPlace(search) {
    const expr = search + '%'
    const places = await this.db('places')
      .whereILike('name_sv', expr)
      .orWhereILike('name_fi', expr)
      .orWhereILike('province_sv', expr)
      .orWhereILike('province_fi', expr)
    return places
  }
}

module.exports = PlaceRepository
