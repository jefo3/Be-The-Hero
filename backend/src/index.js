const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {errors} = require('celebrate');

const app = express();

app.use(cors({
    allowedHeaders: '*',
    exposedHeaders: '*'
}))

app.use(express.json());//informa q vou receber informações em formato JSON
app.use(routes);
app.use(errors());

app.listen(3333);