var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  cors = require('cors'),
  mongoose = require('mongoose'),
  Posto = require('./api/models/postoModel'), //criando o modelo
  bodyParser = require('body-parser');

// Instanciando a url de conexao com o mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Gasdb');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:8080'}));

var routes = require('./api/routes/postoRoutes'); //adicionando a rota
var routes2 = require('./api/routes/postoCoordRoutes');
routes(app); //register the route
routes2(app);


app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + ' não encontrada'
  })
});


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);