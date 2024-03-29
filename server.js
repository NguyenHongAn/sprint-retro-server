const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('./db/mongoDB');
const logger = require("morgan");


//import module router
const homeRouter = require('./routers/homeRouter.js');
const dasboardRouter = require('./routers/dashboardRouter');
const columnRouter = require('./routers/columnRouter');
const authRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter.js');

//json web token
             
//config
const app = express();
// connect mongoDB
connection();

//cors
app.use(cors());

//body-parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
//app.use(cookieParser());

//init passport
app.use(passport.initialize());

require('./middlewares/passport');

//const variable
const PORT = process.env.PORT || 8000;
const HOST_NAME = process.env.HOST_NAME;

//cerate https server

//switch router for handle request from client
app.use(homeRouter);
app.use(profileRouter);
app.use(dasboardRouter);
app.use(authRouter);
app.use(columnRouter);



app.listen(PORT,()=> {console.log(`SERVER START: ${HOST_NAME} AT PORT: ${PORT}`)});