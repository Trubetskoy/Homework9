const fs = require('fs')
const userDataBasePath = './app/user/user.database.json'

function isLogedIn(req, res, next) {
    let apiKey = req.headers['x-apikey']

    if (apiKey) {
        let users = JSON.parse(fs.readFileSync(userDataBasePath)).users

        let userFound = false
        users.forEach((userFromDb) => {
            if (userFromDb.token === apiKey) {
                userFound = true
                next()
            }
        })
        if (userFound) {
            res.sendStatus(401)
        }
    }
    else {
        res.sendStatus(401)
    }
}

module.exports = { isLogedIn }