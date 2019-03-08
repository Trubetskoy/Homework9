const Ajv = require('ajv');
const newToDoSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string'
        },
        selected: {
            type: 'boolean'
        },
        id: {
            type: 'string'
        }
    },
    required: ['userId', 'title', 'description', 'status', 'selected', 'id'],
    additionalProperties: false,
}

const editToDoSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string'
        },
        selected: {
            type: 'boolean'
        },
        id: {
            type: 'string'
        }
    },
    required: ['userId', 'title', 'description', 'status', 'selected', 'id'],
    additionalProperties: false,
}

let ajv = new Ajv()
function newToDoValidator(req, res, next) {
    let valid = ajv.validate(newToDoSchema, req.body)
    if (valid) {
        next()
    }
    else {
        res.status(400).send({ error: ajv.errors })
    }
}

function editToDoValidator (req, res, next) {
    let valid = ajv.validate(editToDoSchema, req.body)
    if (valid) {
        next()
    }
    else {
        res.status(400).send({ error: ajv.errors })
    }
}

module.exports = { newToDoValidator, editToDoValidator }
