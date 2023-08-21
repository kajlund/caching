/*
 * Places route controllers
 */

const { statusCodes } = require('../../utils/statuscodes')
const svcPlace = require('./place.service')

class PlaceController {
  async listPlaces(req, res, next) {
    const filter = {}
    const sort = null
    const limit = req.query.limit || 50
    const skip = req.query.skip || 0
    try {
      const result = await svcPlace.listPlaces(filter, sort, limit, skip)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getPlaceById(req, res, next) {
    try {
      const result = await svcPlace.getPlaceById(req.params.id)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async findPlaces(req, res, next) {
    try {
      const result = await svcPlace.findPlaces(req.query.search)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async createPlace(req, res, next) {
    try {
      const result = await svcPlace.createPlace(req.body)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updatePlace(req, res, next) {
    try {
      const result = await svcPlace.updatePlace(req.params.id, req.body)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async deletePlace(req, res, next) {
    try {
      const result = await svcPlace.deletePlace(req.params.id)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PlaceController()
