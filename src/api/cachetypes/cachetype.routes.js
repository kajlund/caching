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
      handler: ctrl.listItems.bind(ctrl),
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: ctrl.getItemById.bind(ctrl),
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: ctrl.createItem.bind(ctrl),
    },
    {
      method: 'patch',
      path: '/:id',
      middleware: [],
      handler: ctrl.updateItem.bind(ctrl),
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [],
      handler: ctrl.deleteItem.bind(ctrl),
    },
  ],
}
