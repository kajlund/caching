/*
 * Places route controllers
 */

const { statusCodes } = require('../../utils/statuscodes')
const BaseController = require('../../utils/base.controller')
const PlaceService = require('./place.service')
const repo = require('./place.repository')
const svc = new PlaceService(repo)

class PlaceController extends BaseController {
  async findPlacesByName(req, res) {
    const result = await svc.findPlacesByName(req.query.search)
    res.status(statusCodes.OK).json(result)
  }
}

module.exports = new PlaceController(svc)
