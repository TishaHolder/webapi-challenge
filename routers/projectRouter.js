//import express
const express = require('express');

//create router
const projectRouter = express.Router();

//import seed or database files
const projectDB = require('../data/helpers/projectModel.js');

//************END POINTS OR REQUESTS THAT WE NEED TO HANDLE**************/

projectRouter.get('/:id', validateProjectId, (req, res) => {
    
    const projectId = req.params.id;

    projectDB.get(projectId)
    .then(project => {        
        res.status(200).json(project);
       
    })
    .catch(error => {
        console.log("get error", error);
        res.status(500).json( {error: 'There was an error retrieving the project from the database.'} );

    })

});

projectRouter.get('/actions/:id', validateProjectId, (req, res) => {

    const projectId = req.params.id;

    projectDB.getProjectActions(projectId)
    .then(actions => {
        if(actions.length > 0){ //use.length because an empty array is still truthy
            res.status(200).json(actions);
        }
        else {
            res.status(404).json( {message: 'There are no actions associated with this project.'} );

        }
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the project actions from the database.'} );
    })

});

//can't user projectRouter.insert even though that's the name in the helper file. Have to use action verbs:
//GET, POST, PUT, DELETE
projectRouter.post('/', validateProjectInfo, (req, res) => {

    const projectObject = req.body;
    
    projectDB.insert(projectObject)
    .then(newProjectObject => {        
        res.status(200).json(newProjectObject);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error adding the project to the database.'} );
    })

});

projectRouter.put('/:id', validateProjectId, validateProjectInfo, (req, res) => {

    const projectId = req.params.id;
    const changes = req.body;

    projectDB.update(projectId, changes)
    .then(updatedProject => {       
        res.status(200).json(updatedProject);       
    })
    .catch (error => {
        res.status(500).json( {error: 'There was an error updating the project in the database.'} );
    })

});

projectRouter.delete('/:id', validateProjectId, (req, res) => {

    const projectId = req.params.id;

    projectDB.remove(projectId)
    .then(numDeleted => {
        res.status(200).json(numDeleted);

    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error removing the project from the database.' } );
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
            res.status(404).json( {message: 'A project with that id does not exist.'} );
        }
    })
    

};

function validateProjectInfo(req, res, next){
    const projectObject = req.body;
    const projectName = projectObject.name;
    const description = projectObject.description;

    if(!projectObject){
        res.status(400).json( {message: 'Missing project data.'} );
    }
    else if(!projectName){
        res.status(400).json( {message: 'Missing required project name.'} );
    }
    else if(!description){
        res.status(400).json( {message: 'Missing required project description.'} );
    }
    else {
        next();
    }
};

//export the router
module.exports = projectRouter;