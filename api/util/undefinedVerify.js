'use strict';

exports.verify = function (str) {
    var cond = true;
    var msg = [];
    for (var x in str) {
        if (str[x] === undefined) {
            cond = false;
            msg.push("O campo " + x + " é obrigatório");
        }
    }
    if (cond) {
        return cond;
    }
    return msg;
}