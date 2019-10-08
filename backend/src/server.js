require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Este não é o melhor jeito para armazenar os usuários da aplicação. 
// o ideal é usar um banco, como o redis, apenas para esses armazenamentos rápidos
// Desse modo, toda vez que o servidor reiniciar, ele apagará os usuários.
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectedUsers[user_id] = socket.id;

    
});

// Middleware responsável por disponibilizar a conexão ao socket e aos usuários conectados em toda a aplicação
// Agora todas as rotas tem acesso aos dados
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

// req = pega qualquer parametro que o usuario passa na url
// por exemplo: quais os produtos num carrinho de compras etc
// res = resposta dessa requisição
//req.query ( acessar query params para filtros)
// req.params ( acessar route params para edição e delete)
// req.body  (acessar corpo da requisição [criação, edição])

app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes);

server.listen(3333);