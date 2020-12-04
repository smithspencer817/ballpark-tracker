const express = require('express');
const router = express.Router();
const Joi = require('joi');

const visits = [
    {
        id: 1,
        userId: 1,
        ballparkId: 1,
        title: "Wrigley Field 2021",
        description: "great trip!",
        date: new Date(),
    },
    {
        id: 2,
        userId: 2,
        ballparkId: 2,
        title: "Globe Life Field 2021",
        description: "great trip!",
        date: new Date(),
    },
    {
        id: 3,
        userId: 3,
        ballparkId: 3,
        title: "Minute Maid Field 2021",
        description: "great trip!",
        date: new Date(),
    }
]

router.get('/', (req, res) => {
    res.send(visits)
});

router.get('/:id', (req, res) => {
    const visit = visits.find(p => p.id === parseInt(req.params.id));

    if (!visit) return res.status(400).send('The visit with that ID was not found');

    res.send(visit);
});

router.post('/', (req, res) => {
    const { error } = validateVisit(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
    }

    const visit = {
        id: visits.length + 1,
        userId: req.body.userId,
        ballparkId: req.body.ballparkId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }

    visits.push(visit);

    res.send(visit);
});

router.put('/:id', (req, res) => {
    const visit = visits.find(p => p.id === parseInt(req.params.id));

    if (!visit) return res.status(400).send('The visit with that ID was not found');

    const { error } = validateVisit(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
        
    } else {
        visit.userId = req.body.userId
        visit.ballparkId = req.body.ballparkId
        visit.title = req.body.title
        visit.description = req.body.description
        visit.date = req.body.date
        res.send(visit);
    }
});

router.delete('/:id', (req, res) => {
    const visit = visits.find(p => p.id === parseInt(req.params.id));

    if (!visit) return res.status(400).send('The visit with that ID was not found');
    
    const index = visits.indexOf(visit);
    visits.splice(index, 1);

    res.send(visit)
});

function validateVisit(visit) {
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        ballparkId: Joi.number().integer().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.date().default(Date.now),
    })
    return schema.validate(visit);
}

module.exports = router;