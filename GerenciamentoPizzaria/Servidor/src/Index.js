const express = require("express");
const cors = require('cors');
const server = express(); 
server.use(express.json());
server.use(cors());

const PizzaRoutes = require('./routes/PizzaRoutes')
const VendaRoutes = require('./routes/VendaRoutes')
const CategoriaRoutes = require('./routes/CategoriaRoutes')
const LoginRoutes = require('./routes/LoginRoutes')

server.use('/pizza', PizzaRoutes)
server.use('/venda', VendaRoutes)
server.use('/categoria', CategoriaRoutes)
server.use('/auth', LoginRoutes)

server.listen(3000, () => {
    console.log('A API de gerenciamento de Pizzas está online!')
})