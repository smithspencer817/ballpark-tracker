const express = require('express');
const app = express();

app.use(express.json());

let baseballPlayers = [
    {id: 1, name: "Fernando Tatis Jr."},
    {id: 2, name: "Mookie Betts"},
    {id: 3, name: "Ronald Acuna Jr."}
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/baseball-players', (req, res) => {
    res.send(baseballPlayers)
});

app.get('/api/baseball-players/:id', (req, res) => {
    const player = baseballPlayers.find(p => p.id === parseInt(req.params.id));
    if (!player) res.status(400).send('The player with that ID was not found');
    res.send(player);
});

app.post('/api/baseball-players', (req, res) => {
    const player = {
        id: baseballPlayers.length + 1,
        name: req.body.name
    };
    baseballPlayers.push(player)
    res.send(player);
});

app.listen(3000, () => {
    console.log('listening at port 3000');
})