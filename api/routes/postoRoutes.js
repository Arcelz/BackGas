'use strict';
module.exports = function (app) {
  var posto = require('../controllers/postoController');

  // todoList Routes
  app.route('/postos')
    .get(posto.list_all)
    .post(posto.create);


  app.route('/postos/:postoId')
    .get(posto.read)
    .put(posto.update)
    .delete(posto.delete);
};