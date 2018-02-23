'use strict';
var mongoose = require('mongoose'),
    Posto = mongoose.model('Postos'),
    validator = require('validator'),
    undefinedVerify = require('../util/undefinedVerify');

exports.calcularCoord = function (req) {
    if (validator.isNumeric(req.altura)) {
        if (validator.isInt(req.altura, {
                min: 13,
                max: 16
            })) {
            if (validator.isLatLong(req.coordenadas)) {
                Posto.find({}, function (err, task) {
                    if (err)
                        return {
                            code: 400,
                            msg: err
                        }
                    return {
                        code: 200,
                        msg: task
                    }
                });
            }
            return {
                code: 400,
                msg: "A Coordenada está em um formato incorreto"
            };
        }
        return {
            code: 400,
            msg: "O Tipo da Altura não é um inteiro ou esta fora do minimo de 13 ou maximo de 16"
        };
    }
    return {
        code: 400,
        msg: "O Tipo da Altura não é numerico"
    };
}