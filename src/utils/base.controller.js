/*
 * Base controller class
 */

const { statusCodes } = require('./statuscodes')
let self

class BaseController {
  constructor(svc) {
    self = this
    self.svc = svc
  }

  async listItems(req, res, next) {
    try {
      const result = await self.svc.listItems(req.query)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getItemById(req, res, next) {
    try {
      const result = await self.svc.getItemById(req.params.id)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async createItem(req, res, next) {
    try {
      const result = await self.svc.createItem(req.body)
      res.status(statusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateItem(req, res, next) {
    try {
      const result = await self.svc.updateItem(req.params.id, req.body)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  async deleteItem(req, res, next) {
    try {
      const result = await self.svc.deleteItem(req.params.id)
      res.status(statusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BaseController
