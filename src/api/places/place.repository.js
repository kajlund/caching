/*
 * Places repository. Customized data-access module
 */

const BaseRepository = require('../../db/base.repository')

const config = {
  table: 'places',
  filter: {},
  sort: [{ column: 'name_sv', order: 'asc' }],
  limit: 25,
  skip: 0,
  descField: 'name_sv',
}

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
module.exports = new PlaceRepository(config)
