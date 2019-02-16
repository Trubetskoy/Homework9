const express = require('express')
const app = express()
const user = require('./app/user/routes')
const bodyParser = require('body-parser')

app.listen(3219, function (){
    console.log('port 3219')
})

app.options("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    res.status(200).end();
})

app.use(bodyParser.json({limit: '50mb'}))

app.use('/api', user)