/*
 * Cachetype routes controllers
 */

const BaseController = require('../../utils/base.controller')
const svc = require('./cachetype.service')

class CacheTypeController extends BaseController {}

module.exports = new CacheTypeController(svc)
