//import express
const express = require('express');

//create router
const actionRouter = express.Router();

//import seed or database files
const actionDB = require('../data/helpers/actionModel.js');
const projectDB = require('../data/helpers/projectModel.js');

//*******************END POINTS OR REQUESTS THAT WE NEED TO HANDLE****************/


//custom/local middleware
function validateProjectId(req, res, next){

    const projectId = req.params.id;

    projectDB.get(projectId)
    .then(project => {
        if(project){
            next();
        }
        else {
            res.status(404).json( {message: 'A project with that id does not exist.'} );
        }
    })
    

};

function validateActionId(req, res, next){

    const actionId = req.params.id;

    actionDB.get(actionId)
    .then(action => {
        if(action){
            next();
        }
        else {
            res.status(404).json( {message: 'An action with this id does not exist.'} );
        }
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the action from the database.'} );
    })    

};

function validateActionInfo(req, res, next){
    const actionObject = req.body;
    const notes = actionObject.notes;
    const description = actionObject.description;

    if(!actionObject){
        res.status(400).json( {message: 'Missing action data.'} );
    }
    else if(!notes){
        res.status(400).json( {message: 'Missing required action notes.'} );
    }
    else if(!description){
        res.status(400).json( {message: 'Missing required action description.'} );
    }
    else {
        next();
    }
};
//export router
module.exports = actionRouter;