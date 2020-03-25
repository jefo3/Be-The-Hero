const express = require('express');

const ongsController = require('./controller/ongsController');
const incidentsController = require('./controller/incidentsController')
const profileController = require('./controller/profileController');
const sessionsController = require('./controller/sessionsController');

const routes = express.Router();

routes.post('/sessions', sessionsController.login);

routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.delete);
    
module.exports = routes;
