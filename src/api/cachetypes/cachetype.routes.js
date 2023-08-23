/*
 * CacheType route definitions
 */

const ctrl = require('./cachetype.controller')

module.exports = {
  group: {
    prefix: '/cachetypes',
    middleware: [], // TODO:Require auth for all routes
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: ctrl.listItems,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: ctrl.getItemById,
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: ctrl.createItem,
    },
    {
      method: 'patch',
      path: '/:id',
      middleware: [],
      handler: ctrl.updateItem,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [],
      handler: ctrl.deleteItem,
    },
  ],
}
