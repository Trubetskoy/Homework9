const Ajv = require('ajv');

const userSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        surname: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        phone: {
            type: 'string'
        },
        password: {
            type: 'string',
            maxLength: 50,
            minLength: 6,
        },
    },
    required: ['name', 'surname', 'email', 'phone', 'password'],
    additionalProperties: false,
}

const userLoginSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            maxLength: 50,
            minLength: 6,
        },
    },
    required: ['email', 'password'],
    additionalProperties: false,
}

let ajv = new Ajv();

function userValidator(req, res, next) {
    let valid = ajv.validate(userSchema, req.body)
    if (valid) {
        next()
    }
    else {
        res.status(400).send({ error: ajv.errors })
    }
}

function userLoginValidator(req, res, next) {
    let valid = ajv.validate(userLoginSchema, req.body)
    if (valid) {
        next()
    }
    else {
        res.status(400).send({ error: ajv.errors })
    }
}

module.exports = { userValidator, userLoginValidator }
