'use strict';
module.exports = function (app) {
    var coord = require('../controllers/postoCoordController');

    //Pega se os paramentos altura que é a visao do mapa em que altura esta para ser calculado quantos devem ser retornados para preencher a pagina
    //Pega se lat e long que irão somar e retornar qual serão os pontos mais pertos
    app.route('/coord/:altura/:latitude/:longitude')
        .get(coord.read)
};