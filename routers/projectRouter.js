//import express
const express = require('express');

//create router
const projectRouter = express.Router();

//import seed or database files
const projectDB = require('../data/helpers/projectModel.js');

//************END POINTS OR REQUESTS THAT WE NEED TO HANDLE**************/


//export the router
module.exports = projectRouter;