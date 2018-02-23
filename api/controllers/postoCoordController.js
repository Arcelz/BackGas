'use strict';

var postoService = require('../services/postoCoordService');

exports.read = function (req, res) {
  var resposta = postoService.calcularCoord(req.params);
  res.status(resposta.code).json(resposta.msg);
};