const mongoose = require('mongoose');

const connection =() =>{
        mongoose.connect(process.env.MongoURI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() =>{console.log('Connect successful to mongo DB'); })
    .catch(error=>{
        console.log(error);
    });
}
   
module.exports = connection;