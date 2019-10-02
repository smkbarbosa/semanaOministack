require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// req = pega qualquer parametro que o usuario passa na url
// por exemplo: quais os produtos num carrinho de compras etc
// res = resposta dessa requisição
//req.query ( acessar query params para filtros)
// req.params ( acessar route params para edição e delete)
// req.body  (acessar corpo da requisição [criação, edição])

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes);

app.listen(3333);