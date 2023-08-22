/*
 * Places route controllers
 */

const { statusCodes } = require('../../utils/statuscodes')
const BaseController = require('../../utils/base.controller')
const PlaceService = require('./place.service')
const repo = require('./place.repository')
const svc = new PlaceService(repo)

class PlaceController extends BaseController {
  async findPlaces(req, res, next) {
    try {
      const result = await svc.findPlaces(req.query.search)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PlaceController(svc)
