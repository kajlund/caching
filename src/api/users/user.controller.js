/*
 * User route controllers
 */

// const { statusCodes } = require('../../utils/statuscodes')
const BaseController = require('../../utils/base.controller')
const svc = require('./user.service')

class UserController extends BaseController {}

module.exports = new UserController(svc)
