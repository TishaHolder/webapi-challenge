/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

//import express
const express = require ('express');

//import server from server.js
const server = require('./server.js');

// node js has a process object that has a property called env that represents the environment 
// makes the port dynamic so the API is aware of the environment and switches to a different port depending on the environment
// add the environment variable outside of the application code
// process.env object gives us the ability to read the port dynamically from the environment
// dotenv is used to add the port environment variable to our computer
const port = process.env.PORT || 8000;

//heroku will choose a port if 8000 is not available. port 8000 will be used on the local machine 
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

