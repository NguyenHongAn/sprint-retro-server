const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const connection = require('./db/mongoDB');
let log = console.log;

//import module router
const sprintRouter = require('./routers/sprintRouter.js');
//midleware import

             
//config
const app = express();
connection();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

//const variable
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;

//switch router for handle request from client
app.use(sprintRouter);

app.listen(PORT,()=> {console.log(`SERVER START: ${HOST_NAME} AT PORT: ${PORT}`)});