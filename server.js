const express = require('express');
const mongoose = require('mongoose');

// For Mongo Atlas or any Cloud based DB
// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const MONGODB_URI = 'mongodb://SERVER:PORT/DEFAULTDB';

const app = express();
const candidateRoute = require('./routes/candidate');

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(csrf()); // Configure CSRF Tokens 

app.use('/candidate', candidateRoute);

app.use(function(req, res, next){
    return res.status(404).send({ error: 'Not found' });
});

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });
