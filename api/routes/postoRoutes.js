'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/postoController');

  // todoList Routes
  app.route('/postos')
    .get(todoList.list_all)
    .post(todoList.create);


  app.route('/postos/:postoId')
    .get(todoList.read)
    .put(todoList.update)
    .delete(todoList.delete);
};
