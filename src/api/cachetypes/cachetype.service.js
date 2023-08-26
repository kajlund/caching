/*
 * CacheType services Singleton
 */

const BaseRepository = require('../../db/base.repository')
const BaseService = require('../../utils/base.service')

class CacheTypeService extends BaseService {
  validate(data) {
    // TODO: Implement proper validation
    const result = super.validate()
    if (data.name) result.name = data.name

    return result
  }
}

const repo = new BaseRepository({
  table: 'cachetypes',
  filter: {},
  sort: ['name'],
  limit: 25,
  skip: 0,
  descField: 'name',
})

module.exports = new CacheTypeService(repo)
