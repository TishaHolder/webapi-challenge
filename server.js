//import express
const express = require('express');

//create express application
const server = express();

//mount our use global middleware
server.use(express.json());

//global get requests - welcome message to the API
server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Sprint Challenge API</h2>`);
})

//import routers
const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter.js');

//mount routers
server.use('/api/projects', projectRouter);
//server.use('/api/projects/actions', actionRouter);

//export server
module.exports = server;