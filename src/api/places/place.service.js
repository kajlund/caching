/*
 * Place services Singleton
 */

const BaseService = require('../../utils/base.service')
const repo = require('./place.repository')

class PlaceService extends BaseService {
  async findPlacesByName(search) {
    // Find places based on search
    const result = await this.repo.searchPlace(search)

    return {
      success: true,
      msg: `Found ${result.length} places on search: ${search}`,
      search,
      count: result.length,
      data: [...result],
    }
  }

  validate(data) {
    // TODO: Implement proper validation
    const result = super.validate()
    if (data.code) result.code = parseInt(data.code)
    if (data.nameFi) result.name_fi = data.nameFi
    if (data.nameSv) result.name_sv = data.nameSv
    if (data.provinceFi) result.province_fi = data.provinceFi
    if (data.provinceSv) result.province_sv = data.provinceSv

    return result
  }
}

module.exports = new PlaceService(repo)
