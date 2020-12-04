const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let baseballPlayers = [
    {id: 1, name: "Fernando Tatis Jr."},
    {id: 2, name: "Mookie Betts"},
    {id: 3, name: "Ronald Acuna Jr."}
]

app.get('/', (req, res) => {
    // just show it's working
    res.send('Hello World!');
});

app.get('/api/baseball-players', (req, res) => {
    // easy, just return all the players
    res.send(baseballPlayers)
});

app.get('/api/baseball-players/:id', (req, res) => {
    // find the player to make sure they exist
    const player = baseballPlayers.find(p => p.id === parseInt(req.params.id));

    // if the player doesn't exist, send a 400 status code and return
    if (!player) return res.status(400).send('The player with that ID was not found');

    // if everything went fine return the player
    res.send(player);
});

app.post('/api/baseball-players', (req, res) => {
    // validate the body of the request
    const { error } = validatePlayer(req.body);

    // handle errors if any
    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
    }

    // create a new player object
    const player = {
        id: baseballPlayers.length + 1,
        name: req.body.name
    }

    // add that new player object to the database
    baseballPlayers.push(player);

    // return the newly created player
    res.send(player);
});

app.put('/api/baseball-players/:id', (req, res) => {
    // find player
    const player = baseballPlayers.find(p => p.id === parseInt(req.params.id));

    // if not there, send status code and return
    if (!player) return res.status(400).send('The player with that ID was not found');

    // if player found, validate new player data
    const { error } = validatePlayer(req.body)

    // if the validation didn't pass, share the messages send a status code and return
    if (error) {
        const errorMessages = error.details.map(err => err.message)
        res.status(400).send(errorMessages)
        return;
        
    // otherwise update the properties of the found player with new data and return the player
    } else {
        player.name = req.body.name;
        res.send(player);
    }
});

app.delete('/api/baseball-players/:id', (req, res) => {
    // find the player to make sure they exist
    const player = baseballPlayers.find(p => p.id === parseInt(req.params.id));

    // if the player doesn't exist, send a 400 status code and return
    if (!player) return res.status(400).send('The player with that ID was not found');
    
    // find the index of the player and delete him from DB
    const index = baseballPlayers.indexOf(player);
    baseballPlayers.splice(index, 1);

    // no consistent way to send response from delete
    res.send(player)
});

function validatePlayer(player) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(player);
}

app.listen(3000, () => {
    console.log('listening at port 3000');
})