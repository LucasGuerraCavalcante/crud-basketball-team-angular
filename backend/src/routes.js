const express = require('express');
const TeamControler = require('./controllers/TeamControler');

const routes = express.Router();

routes.get('/ongs', TeamControler.index)

module.exports = routes;