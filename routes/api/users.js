const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../db/knex');

router.get('/', (req, res) => {
    db.select('*').from('users').then(users => {
        res.send(users)
    });
});

router.get('/:id', (req, res) => {
    db.select('*').from('users').where({id: req.params.id})
    .then(user => {
        // query resolves to an empty array if user not found
        // if user found, returns an array with object of length 1
        if (!user.length) {
            res.status(400).send('User not found');
        } else {
            res.send(user);
        }
    })
});

router.post('/', (req, res) => {
    db.insert(req.body).into('users').returning('*')
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
    const user = users.find(p => p.id === parseInt(req.params.id));

    if (!user) return res.status(400).send('The user with that ID was not found');

    const { error } = validateUser(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
        
    } else {
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.favoriteTeam = req.body.favoriteTeam
        res.send(user);
    }
});

router.delete('/:id', (req, res) => {
    const user = users.find(p => p.id === parseInt(req.params.id));

    if (!user) return res.status(400).send('The user with that ID was not found');
    
    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user)
});

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        favoriteTeam: Joi.string().required(),
    })
    return schema.validate(user);
}

module.exports = router;