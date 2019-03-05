const express = require('express')
const router = express.Router()
const fs = require('fs')
const toDoDataBasePath = './app/toDo/toDo.database.json'
const { isLogedIn } = require('../user/authentication')

router.post('/todolist', isLogedIn, (req, res) => {
    let toDo = req.body
    let toDoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    toDoList.push(toDo)
    let toDoToJson = JSON.stringify({ toDoList })
    fs.writeFile(toDoDataBasePath, toDoToJson)
    res.send(toDo)
})

router.get('/todolist', isLogedIn, (req, res) => {
    let userId = req.headers['x-apikey']
    let todoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    let userTodo = todoList.filter(todo => todo.userId === userId)
    res.send(userTodo)
})
module.exports = router