const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../db/knex');

router.get('/', (req, res) => {
    db('team').select('*').then(teams => {
        res.send(teams);
    });
});

router.get('/:id', (req, res) => {
    db('team').select('*').where({id: req.params.id})
    .then(team => {
        if (!team.length) {
            res.status(400).send(
                { error: `Team with id=${req.params.id} not found` }
            );
        } else {
            res.send(team);
        }
    })
});

router.post('/', (req, res) => {

    // validate incoming body data
    const { error } = validateTeam(req.body);

    if (error) {
        const errorMessage = { error: error.details[0].message }
        res.status(400).send(errorMessage)
        return;
    }

    // if data is verified, convert to postgresql snake case syntax
    const newTeam = {
        name: req.body.name,
        league: req.body.league
    }

    db.insert(newTeam).into('team').returning('*')
    .then(team => res.json(team))
    .catch(err => res.json({ error: err.detail }))

});

function validateTeam(team) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        league: Joi.string().required()
    })
    return schema.validate(team);
}

module.exports = router;