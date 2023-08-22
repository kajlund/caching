/*
 * Places route controllers
 */

const { statusCodes } = require('../../utils/statuscodes')
const PlaceService = require('./place.service')
const repo = require('./place.repository')
const svc = new PlaceService(repo)

class PlaceController {
  async listPlaces(req, res, next) {
    try {
      const result = await svc.listItems(req.query)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getPlaceById(req, res, next) {
    try {
      const result = await svc.getItemById(req.params.id)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async findPlaces(req, res, next) {
    try {
      const result = await svc.findPlaces(req.query.search)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async createPlace(req, res, next) {
    try {
      const result = await svc.createItem(req.body)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updatePlace(req, res, next) {
    try {
      const result = await svc.updateItem(req.params.id, req.body)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async deletePlace(req, res, next) {
    try {
      const result = await svc.deleteItem(req.params.id)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PlaceController()
