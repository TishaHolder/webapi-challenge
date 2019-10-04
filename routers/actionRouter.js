//import express
const express = require('express');

//create router
const actionRouter = express.Router();

//import seed or database files
const actionDB = require('../data/helpers/actionModel.js');
const projectDB = require('../data/helpers/projectModel.js');

//*******************END POINTS OR REQUESTS THAT WE NEED TO HANDLE****************/
actionRouter.get('/:id', validateActionId, (req, res) => {
    const actionId = req.params.id;

    actionDB.get(actionId)
    .then(action => {       
        res.status(200).json(action);       
        
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the action from the database.'} );
    })

});

actionRouter.post('/:id', validateProjectId, (req, res) => {

    const project_id = req.params.id;
    const action = req.body;
    const description = action.description;
    const notes = action.notes;
    const completed = action.completed;

    actionDB.insert({project_id, description, notes, completed})
    .then(action => {
        if(action){
            res.status(200).json(action);
        }
        else {
            res.status(404).json( {message: 'Missing required action information.'} );
        }
    })
    .catch(error => {
        console.log("add action error", error);
        res.status(500).json( {error: 'There was an error while writing the action to the database.'} );
    })
});

actionRouter.put('/:id', validateActionId, validateActionInfo, (req, res) => {

    const id = req.params.id;
    const changes = req.body;
    const description = changes.description;
    const notes = changes.notes;
    const completed = changes.notes;

    actionDB.update(id, changes)
    .then(updatedAction => {
        res.status(200).json(updatedAction);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error updating the action.'} );
    })

});

actionRouter.delete('/:id', validateActionId, (req, res) => {

    const actionId = req.params.id;

    actionDB.remove(actionId)
    .then(numDeleted => {
        res.status(404).json(numDeleted);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error deleting the action from the database.'} );
    })


});

//custom/local middleware
function validateProjectId(req, res, next){

    const projectId = req.params.id;

    projectDB.get(projectId)
    .then(project => {
        if(project){
            next();
        }
        else {
            res.status(400).json( {message: 'A project with that id does not exist.'} );
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