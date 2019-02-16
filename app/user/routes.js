const express = require('express')
const router = express.Router()
const fs = require('fs') 
const userDataBasePath = './app/user/user.database.json'

router.get('/test',(req, res)=>{
    res.send('hello')
})

router.post ('/registration', (req, res)=>{
    let user = req.body
    let users = JSON.parse(fs.readFileSync(userDataBasePath)).users
    let isUnique = true
    users.forEach( userFromDb => {
        console.log(user.email)
        if (userFromDb.email === user.email){
            isUnique = false
        }
    })
    if(isUnique) {
        console.log(1)
        users.push(user)
        let userToJson = JSON.stringify({users:users})
        fs.writeFile(userDataBasePath, userToJson)
        res.send (user)
   } else {
       res.sendStatus(409)
   }
})

module.exports = router