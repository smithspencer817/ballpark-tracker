const express = require('express');
const router = express.Router();
const Joi = require('joi');

const ballparks = [
    {id: 1, name: "Wrigley Field", location: "Chicago", homeTeam: "Cubs"},
    {id: 2, name: "Globe Life Field", location: "Arlington", homeTeam: "Rangers"},
    {id: 3, name: "Minute Maid Park", location: "Houston", homeTeam: "Astros"}
]

router.get('/', (req, res) => {
    res.send(ballparks)
});

router.get('/:id', (req, res) => {
    const ballpark = ballparks.find(p => p.id === parseInt(req.params.id));

    if (!ballpark) return res.status(400).send('The ballpark with that ID was not found');

    res.send(ballpark);
});

router.post('/', (req, res) => {
    const { error } = validateBallpark(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
    }

    const ballpark = {
        id: ballparks.length + 1,
        name: req.body.name,
        location: req.body.location,
        homeTeam: req.body.homeTeam
    }

    ballparks.push(ballpark);

    res.send(ballpark);
});

router.put('/:id', (req, res) => {
    const ballpark = ballparks.find(p => p.id === parseInt(req.params.id));

    if (!ballpark) return res.status(400).send('The ballpark with that ID was not found');

    const { error } = validateBallpark(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
        
    } else {
        ballpark.name = req.body.name;
        ballpark.location = req.body.location;
        ballpark.homeTeam = req.body.homeTeam;
        res.send(ballpark);
    }
});

router.delete('/:id', (req, res) => {
    const ballpark = ballparks.find(p => p.id === parseInt(req.params.id));

    if (!ballpark) return res.status(400).send('The ballpark with that ID was not found');
    
    const index = ballparks.indexOf(ballpark);
    ballparks.splice(index, 1);

    res.send(ballpark)
});

function validateBallpark(ballpark) {
    const schema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        homeTeam: Joi.string().required()
    })
    return schema.validate(ballpark);
}

module.exports = router;