const express = require('express')
const router = express.Router()
const fs = require('fs')
const userDataBasePath = './app/user/user.database.json'
const uuidv1 = require('uuid/v1')
const { userValidator, userLoginValidator } = require('./user.validator')

router.get('/test', (req, res) => {
    res.send('hello')
})

router.post('/registration', userValidator, (req, res) => {
    let user = req.body
    let users = JSON.parse(fs.readFileSync(userDataBasePath)).users
    let isUnique = true
    users.forEach(userFromDb => {
        if (userFromDb.email === user.email) {
            isUnique = false
        }
    })
    if (isUnique) {
        users.push(user)
        let userToJson = JSON.stringify({ users: users })
        fs.writeFileSync(userDataBasePath, userToJson)
        res.send(user)
    } else {
        res.sendStatus(409)
    }
})

router.post('/login', userLoginValidator, (req, res) => {
    let user = req.body
    let users = JSON.parse(fs.readFileSync(userDataBasePath)).users
    let userFound = false
    users.forEach((userFromDb) => {
        if (userFromDb.email === user.email && user.password === userFromDb.password) {
            userFromDb.token = uuidv1()
            userFound = userFromDb
        }
    })
    if (!userFound) {
        res.sendStatus(401)
    }
    else {
        let userToJson = JSON.stringify({ users: users })
        fs.writeFileSync(userDataBasePath, userToJson)
        res.send(userFound)
    }

})



module.exports = router