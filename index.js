const express = require('express')
const app = express()
const user = require('./app/user/routes')
const toDo = require('./app/toDo/routes')
const bodyParser = require('body-parser')

app.listen(3219, function (){
    console.log('port 3219')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-apikey, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json({limit: '50mb'}))

app.use('/api', user)
app.use('/api', toDo)