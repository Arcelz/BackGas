'use strict';
// Responsavel pelas regras de negocio
var validator = require('validator');
var undefinedVerify = require('../util/undefinedVerify')
exports.post = function (req) {
    var verifyToReturn = undefinedVerify.verify({
        'Nome': req.nome,
        'Cnpj': req.cnpj,
        'Latitude':req.latitude,
        'Longitude':req.longitude
    });
    if (verifyToReturn !== true){
        return verifyToReturn;
    }

    /*    console.log(validator.isLength(req.nome, {
            min: 6,
            max: 30     // essas serão verificações que serão adicionadas dentros dos if's acima
        }))
        console.log(req.cordenadas)
        validator.isLatLong(req.cordenadas)*/
    return true;
}