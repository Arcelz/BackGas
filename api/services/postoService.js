'use strict';

var validator = require('validator');
var undefinedVerify = require('../util/undefinedVerify')
exports.post = function (req) {
    var verifyToReturn = undefinedVerify.verify({
        'Nome': req.nome,
        'Cnpj': req.cnpj,
        'Coordenadas':req.coordenadas
    });
    if (verifyToReturn !== true){
        return verifyToReturn;
    }

    /*    console.log(validator.isLength(req.nome, {
            min: 6,
            max: 30
        }))
        console.log(req.cordenadas)
        validator.isLatLong(req.cordenadas)*/
    return true;
}