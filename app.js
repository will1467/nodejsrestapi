const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const ejwt = require('express-jwt');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true});
})

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () =>{
    require('./routes/customers')(app);
    require('./routes/users')(app);
    console.log("Server started on port " + config.PORT);
})

