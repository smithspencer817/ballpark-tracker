const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../db/knex');

router.get('/', (req, res) => {
    db('users').select('*').then(users => {
        res.send(users)
    });
});

router.get('/:id', (req, res) => {
    db('users').select('*').where({id: req.params.id})
    .then(user => {
        if (!user.length) {
            res.status(400).send(
                { error: `User with id=${req.params.id} not found` }
            );
        } else {
            res.send(user);
        }
    })
});

router.post('/', (req, res) => {

    // validate incoming body data
    const { error } = validateUser(req.body);

    if (error) {
        const errorMessage = { error: error.details[0].message }
        res.status(400).send(errorMessage)
        return;
    }

    // if data is verified, convert to postgresql snake case syntax
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        favorite_team_id: req.body.favoriteTeamId,
        age: req.body.age
    }

    db.insert(newUser).into('users').returning('*')
    .then(user => res.json(user))
    .catch(err => res.json({ error: err.detail }))

});

router.put('/:id', (req, res) => {

    const { error } = validateUser(req.body);

    if (error) {
        const errorMessage = { error: error.details[0].message }
        res.status(400).send(errorMessage)
        return;
    }

    db('users').where({id: req.params.id}).update(req.body).returning('*')
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
    
});

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(8).max(20).alphanum(),
        password: Joi.string(),
        email: Joi.string().email(),
        firstName: Joi.string().min(1).max(50),
        lastName: Joi.string().min(1).max(50),
        favoriteTeamId: Joi.number().integer().min(1).max(30),
        age: Joi.number().integer().min(16).max(80)
    })
    return schema.validate(user);
}

module.exports = router;