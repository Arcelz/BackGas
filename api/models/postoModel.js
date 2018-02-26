'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostoSchema = new Schema({
  nome: {
    type: String,
    required: 'Digite o nome do posto'
  },
  cnpj:{
    type:Number,
    required:'Digite o cnpj',
  },
  latitude:{
    type:String,
    required:'Marque as cordenadas',
  },
  longitude:{
    type:String,
    required:'Marque as cordenadas',
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['desativado', 'ativado']
    }],
    default: ['ativado']
  }
});

module.exports = mongoose.model('Postos', PostoSchema);