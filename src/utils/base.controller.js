/*
 * Base controller class
 * Implements reusable standard CRUD functionality
 */

const { statusCodes } = require('./statuscodes')

class BaseController {
  constructor(svc) {
    this.svc = svc
  }

  async listItems(req, res) {
    const result = await this.svc.listItems(req.query)
    res.status(statusCodes.OK).json(result)
  }

  async getItemById(req, res) {
    const result = await this.svc.getItemById(req.params.id)
    res.status(statusCodes.CREATED).json(result)
  }

  async createItem(req, res) {
    const result = await this.svc.createItem(req.body)
    res.status(statusCodes.CREATED).json(result)
  }

  async updateItem(req, res) {
    const result = await this.svc.updateItem(req.params.id, req.body)
    res.status(statusCodes.OK).json(result)
  }

  async deleteItem(req, res) {
    const result = await this.svc.deleteItem(req.params.id)
    res.status(statusCodes.OK).json(result)
  }
}

module.exports = BaseController
