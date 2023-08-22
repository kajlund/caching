/*
 * Places services
 */

const { InternalServerError, NotFoundError } = require('../../utils/errors')
const BaseService = require('../../utils/baseservice')
const repo = require('./place.repository')

const dataToPlaceData = (data) => {
  const { code, nameFi, nameSv, provinceFi, provinceSv } = data
  return {
    code: parseInt(code),
    name_fi: nameFi,
    name_sv: nameSv,
    province_fi: provinceFi,
    province_sv: provinceSv,
  }
}

class PlaceService extends BaseService {
  async listPlaces(query) {
    const qry = this.parseQuery(query)
    const result = await this.repo.query(qry)

    return {
      success: true,
      msg: `Returned ${result.length} places`,
      query: qry,
      count: result.length,
      data: [...result],
    }
  }

  async getPlaceById(id) {
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)

    return {
      success: true,
      msg: `Found place ${found.name_sv}`,
      data: found,
    }
  }

  async findPlaces(search) {
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

  async createPlace(postData) {
    // Format posted data
    const placeData = dataToPlaceData(postData)
    // Create place
    const result = await this.repo.createOne(placeData)

    return {
      success: true,
      msg: `Created place: ${result.name_sv}`,
      data: result,
    }
  }

  async updatePlace(id, postData) {
    // Verify place exists
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)
    // Format posted data
    const placeData = dataToPlaceData(postData)
    // Update place
    const result = await this.repo.updateOne(id, placeData)

    return {
      success: true,
      msg: `Updated place ${result.name_sv}`,
      data: result,
    }
  }

  async deletePlace(id) {
    // Ensure it exists
    const found = await this.repo.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)
    // Delete place
    const result = await this.repo.deleteOne(id)
    if (!result) throw new InternalServerError(`Place with id ${id} could not be deleted`)

    return {
      success: true,
      msg: `Deleted cachetype ${result.name_sv}`,
      data: result,
    }
  }
}

module.exports = new PlaceService(repo)
