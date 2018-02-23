'use strict';


var mongoose = require('mongoose'),
  Posto = mongoose.model('Postos');
var postoService = require('../services/postoService');

exports.list_all = function (req, res) {
  Posto.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create = function (req, res) {
  if (postoService.post(req.body) === true) {
    var new_posto = new Posto(req.body);
    new_posto.save(function (err, posto) {
      if (err)
        res.send(err);
      res.status(201).json(posto);
    });
  } else {
    res.status(400).json((postoService.post(req.body)))
 }
};


exports.read = function (req, res) {
  Posto.findById(req.params.postoId, function (err, posto) {
    if (err)
      res.send(err);
    res.json(posto);
  });
};


exports.update = function (req, res) {
  Task.findOneAndUpdate({
    _id: req.params.taskId
  }, req.body, {
    new: true
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete = function (req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({
      message: 'Task successfully deleted'
    });
  });
};