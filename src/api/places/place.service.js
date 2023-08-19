/*
 * Places services layer
 */

const placeDAL = require('./place.dal')
const { InternalServerError, NotFoundError } = require('../../utils/errors')

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
  async listPlaces() {
    const places = await placeDAL.getList()
    return places
  }

  async findPlaceById(id) {
    const place = await placeDAL.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)
    return place
  }

  async findPlaces(search) {
    // Find places based on search
    const places = await placeDAL.find(search)
    return places
  }

  async createPlace(postData) {
    // Format posted data
    const placeData = dataToPlaceData(postData)
    // Create place
    const place = await placeDAL.create(placeData)
    return place
  }

  async updatePlace(id, postData) {
    // Verify place exists
    const place = await placeDAL.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)
    // Format posted data
    const placeData = dataToPlaceData(postData)
    // Update place
    const updated = await placeDAL.update(id, placeData)
    return updated
  }

  async deletePlace(id) {
    // Ensure it exists
    const place = await placeDAL.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)
    // Delete place
    const result = await placeDAL.deleteOne(id)
    if (!result.length) throw new InternalServerError(`Place with id ${id} could not be deleted`)
    return result[0]
  }
}

module.exports = new PlaceService()
