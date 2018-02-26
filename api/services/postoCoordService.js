'use strict';

var mongoose = require('mongoose'),
    Posto = mongoose.model('Postos'),
    validator = require('validator'),
    undefinedVerify = require('../util/undefinedVerify'),
    code, msg;

exports.calcularCoord = function (req) {
    if (validator.isNumeric(req.altura)) {
        if (validator.isInt(req.altura, {
                min: 13,
                max: 16
            })) {
            var calculaLat = req.latitude.split(".");
            var latCalculada = Array.from(calculaLat[1]);
            latCalculada[0] = parseInt(latCalculada[0]) + 1;
            calculaLat = calculaLat[0] + "." + latCalculada.join(['']);
            console.log(req.latitude +"     "+calculaLat)
            Posto.find({
                "latitude": {
                    $lt: calculaLat
                }
            }, function (err, task) {
                if (err) {
                    code = 400;
                    msg = err;
                }
                code = 200;
                msg = task;
            })
            return {
                code: code,
                msg: msg
            }
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