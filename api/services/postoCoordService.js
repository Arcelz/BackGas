'use strict';

var mongoose = require('mongoose'),
    Posto = mongoose.model('Postos'),
    validator = require('validator'),
    code = 400,
    msg = "Erro na requisição, repita ou tente mais tarde";

exports.calcularCoord = function (req) {
    if (validator.isNumeric(req.altura)) {
        if (validator.isInt(req.altura, {
                min: 13,
                max: 16
            })) {
            function verificaZeroNove(str, altura) {
                var quanto
                if (altura === 15)
                    quanto = 1;
                else if (altura === 16)
                    quanto = 2;
                else if (altura === 17)
                    quanto = 4;
                else {
                    quanto = 1;
                }

                var stringArray = Array.from(str[1]);
                var valor = parseInt(stringArray[0]);
                if (valor - quanto >= 0 && valor + quanto <= 9) {
                    stringArray[0] = valor - quanto;
                    var abaixo = str[0] + "." + stringArray.join(['']);
                    stringArray[0] = valor + quanto;
                    var acima = str[0] + "." + stringArray.join(['']);
                    return {
                        acima: acima,
                        abaixo: abaixo
                    }
                } else if (valor - quanto < 0) {
                    stringArray[0] = valor + quanto;
                    var acima = str[0] + "." + stringArray.join(['']);
                    stringArray[0] = 10 - (quanto - valor);
                    if (str[0] < 0) {
                        str[0] = parseInt(str[0]) + 1;
                    } else {
                        str[0] = parseInt(str[0]) - 1;
                    }
                    var abaixo = str[0] + "." + stringArray.join(['']);
                    return {
                        acima: acima,
                        abaixo: abaixo
                    }
                }
                stringArray[0] = valor - quanto;
                var abaixo = str[0] + "." + stringArray.join(['']);
                stringArray[0] = quanto;
                if (str[0] < 0) {
                    str[0] = parseInt(str[0]) - 1;
                } else {
                    str[0] = parseInt(str[0]) + 1;
                }
                var acima = str[0] + "." + stringArray.join(['']);
                return {
                    acima: acima,
                    abaixo: abaixo
                }
            }
            var calculaLong = req.longitude.split(".");
            var calculaLat = req.latitude.split(".");
            var latitude = verificaZeroNove(calculaLat);
            var longitude = verificaZeroNove(calculaLong);
            console.log(latitude)
            console.log(longitude)
            Posto.find({
                "latitude": {
                    $gt: latitude.abaixo,
                    $lt: latitude.acima
                },
                "longitude": {
                    $gt: longitude.abaixo,
                    $lt: longitude.acima
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