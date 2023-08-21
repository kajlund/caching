/*
 * Places services
 */

const { InternalServerError, NotFoundError } = require('../../utils/errors')
const DAO = require('../../db/dao')
const repoPlace = require('./place.repository')

const daoPlace = new DAO('places')

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

class PlaceService {
  async listPlaces(query) {
    query = query || {}
    const qry = {
      filter: query.filter || {},
      sort: query.sort || [{ column: 'name_sv', order: 'asc' }],
      limit: query.limit || 10,
      skip: query.skip || 0,
    }
    const result = await daoPlace.query(qry)

    return {
      success: true,
      msg: `Returned ${result.length} places`,
      query: qry,
      count: result.length,
      data: [...result],
    }
  }

  async findPlaceById(id) {
    const found = await daoPlace.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)

    return {
      success: true,
      msg: `Found place ${found.name_sv}`,
      data: found,
    }
  }

  async findPlaces(search) {
    // Find places based on search
    const result = await repoPlace.searchPlace(search)

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
    const [place] = await daoPlace.create(placeData)
    return place
  }

  async updatePlace(id, postData) {
    // Verify place exists
    const found = await daoPlace.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)
    // Format posted data
    const placeData = dataToPlaceData(postData)
    // Update place
    const result = await daoPlace.update(id, placeData)

    return {
      success: true,
      msg: `Updated place ${result.name_sv}`,
      data: result,
    }
  }

  async deletePlace(id) {
    // Ensure it exists
    const found = await daoPlace.findByID(id)
    if (!found) throw new NotFoundError(`A place with id ${id} was not found`)
    // Delete place
    const result = await daoPlace.deleteOne(id)
    if (!result) throw new InternalServerError(`Place with id ${id} could not be deleted`)

    return {
      success: true,
      msg: `Deleted cachetype ${result.name_sv}`,
      data: result,
    }
  }
}

module.exports = new PlaceService()
