const svcPlace = require('./place.service')
const { statusCodes } = require('../../utils/statuscodes')

class PlaceController {
  async getAllPlaces(req, res, next) {
    try {
      const places = await svcPlace.getPlacesList()
      res.status(statusCodes.OK).json({ success: true, data: { places } })
    } catch (err) {
      next(err)
    }
  }

  async getPlaceById(req, res, next) {
    try {
      const place = await svcPlace.getPlaceById(req.params.id)
      res.status(statusCodes.CREATED).json({ success: true, data: { place } })
    } catch (err) {
      next(err)
    }
  }

  async findPlaces(req, res, next) {
    try {
      const places = await svcPlace.findPlaces(req.query.search)
      res
        .status(statusCodes.OK)
        .json({ success: true, msg: `Found ${places.length} places on search ${req.query.search}`, data: { places } })
    } catch (err) {
      next(err)
    }
  }

  async createPlace(req, res, next) {
    try {
      const place = await svcPlace.createPlace(req.body)
      res.status(statusCodes.CREATED).json({ success: true, data: { place } })
    } catch (err) {
      next(err)
    }
  }

  async updatePlace(req, res, next) {
    try {
      const place = await svcPlace.updatePlace(req.params.id, req.body)
      res.status(statusCodes.OK).json({ success: true, data: { place } })
    } catch (err) {
      next(err)
    }
  }
  async deletePlace(req, res, next) {
    try {
      const place = await svcPlace.deletePlace(req.params.id)
      res.status(statusCodes.OK).json({ success: true, msg: `Deleted place ${place.name_fi}`, data: { place } })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PlaceController()
