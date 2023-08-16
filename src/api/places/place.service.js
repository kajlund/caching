const placeDAO = require('./place.dao')
const { InternalServerError, NotFoundError } = require('../../utils/errors')

class PlaceService {
  async getPlacesList() {
    const places = await placeDAO.getList()
    return places
  }

  async getPlaceById(id) {
    const place = await placeDAO.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)
    return place
  }

  async findPlaces(search) {
    const places = await placeDAO.find(search)
    return places
  }

  async createPlace(data) {
    const { code, nameFi, nameSv, provinceFi, provinceSv } = data
    const placeData = {
      code: parseInt(code),
      name_fi: nameFi,
      name_sv: nameSv,
      province_fi: provinceFi,
      province_sv: provinceSv,
    }
    const id = await placeDAO.create(placeData)
    const place = await placeDAO.findByID(id)
    return place
  }

  async updatePlace(id, data) {
    const { code, nameFi, nameSv, provinceFi, provinceSv } = data

    // Ensure it exists
    const place = await placeDAO.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)

    const placeData = {
      code: parseInt(code),
      name_fi: nameFi,
      name_sv: nameSv,
      province_fi: provinceFi,
      province_sv: provinceSv,
    }
    const updated = await placeDAO.updateById(id, placeData)
    return updated
  }

  async deletePlace(id) {
    // Ensure it exists
    const place = await placeDAO.findByID(id)
    if (!place) throw new NotFoundError(`A place with id ${id} was not found`)

    // Try to delete
    const result = await placeDAO.deleteOne(id)
    if (!result.length) throw new InternalServerError(`Place with id ${id} could not be deleted`)
    return result[0]
  }
}

module.exports = new PlaceService()
