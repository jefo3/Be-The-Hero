const express = require('express');

const {celebrate, Segments, Joi} = require('celebrate');

const ongsController = require('./controller/ongsController');
const incidentsController = require('./controller/incidentsController')
const profileController = require('./controller/profileController');
const sessionsController = require('./controller/sessionsController');

const routes = express.Router();

routes.post('/sessions', sessionsController.login);

routes.get('/ongs', ongsController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,ongsController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}) ,profileController.index);

routes.post('/incidents', incidentsController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) , incidentsController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,incidentsController.delete);
    
module.exports = routes;
