/*
 * CacheType services Singleton
 */

const BaseRepository = require('../../db/base.repository')
const BaseService = require('../../utils/base.service')

class CacheTypeService extends BaseService {
  validateData(postData, isNew = false) {
    const errors = {}
    const data = super.validateData(postData, isNew)

    // Build and validate patch data
    if (postData.name && postData.name.trim()) {
      data.name = parseInt(postData.code)
      if (!data.code) {
        errors.code = 'The code must be a valid number'
      }
    }
    // Ensure required data for new cachetypes
    if (isNew && !data.name) {
      errors.fields = 'A cache type must have a name'
    }

    const isValid = Object.keys(errors).length === 0
    return { isValid, errors, data }
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
