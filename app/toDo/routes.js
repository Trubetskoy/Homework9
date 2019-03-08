const express = require('express')
const router = express.Router()
const fs = require('fs')
const toDoDataBasePath = './app/toDo/toDo.database.json'
const { isLogedIn } = require('../user/authentication')
const { newToDoValidator, editToDoValidator } = require('./toDo.validator')

router.post('/todolist', newToDoValidator, isLogedIn, (req, res) => {
    let toDo = req.body
    let toDoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    toDoList.push(toDo)
    let toDoToJson = JSON.stringify({ toDoList })
    fs.writeFileSync(toDoDataBasePath, toDoToJson)
    res.send(toDo)
})

router.get('/todolist', isLogedIn, (req, res) => {
    let userId = req.headers['x-apikey']
    let todoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    let userTodo = todoList.filter(todo => todo.userId === userId)
    res.send(userTodo)
})

router.delete('/todolist/:toDoId', isLogedIn, (req, res) => {
    let toDoId = req.params.toDoId
    let toDoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    toDoList.forEach((toDoFromDb, index) => {
        if (toDoFromDb.id === toDoId) {
            toDoList.splice(index, 1)
        }
    })
    let toDoListToJson = JSON.stringify({ toDoList })
    fs.writeFileSync(toDoDataBasePath, toDoListToJson)
    res.send({ status: 200 })
})

router.put('/todolist/:toDoId', editToDoValidator, isLogedIn, (req, res) => {
    let toDo = req.body
    let toDoList = JSON.parse(fs.readFileSync(toDoDataBasePath)).toDoList
    let toDoId = req.params.toDoId
    toDoList.forEach((toDoFromDb, index) => {
        if (toDoFromDb.id === toDoId) {
            toDoList.splice(index, 1, toDo)
        }
    })
    let toDoToJson = JSON.stringify({ toDoList })
    fs.writeFileSync(toDoDataBasePath, toDoToJson)
    res.send(toDo)
})
module.exports = router
