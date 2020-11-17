const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('./db/mongoDB');
const logger = require("morgan");

require('./middlewares/passport');

//const verifyToken = require('./middlewares/verifyToken');
//import module router
const homeRouter = require('./routers/homeRouter.js');
const dasboardRouter = require('./routers/dashboardRouter');
const columnRouter = require('./routers/columnRouter');
const userRouter = require('./routers/userRouter');
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
//require('./middlewares/passport');

//const variable
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;

//switch router for handle request from client
app.use(homeRouter);
app.use(profileRouter);
app.use(dasboardRouter);
app.use(userRouter);
app.use(columnRouter);

//error handle
// app.use(function(req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     res.send(err);
//   });


app.listen(PORT,()=> {console.log(`SERVER START: ${HOST_NAME} AT PORT: ${PORT}`)});