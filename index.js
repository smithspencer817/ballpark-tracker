const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/baseball-players', (req, res) => {
    res.send(["Fernando Tatis Jr.", "Mookie Betts", "Ronald Acuna Jr."])
});

app.listen(3000, () => {
    console.log('listening at port 3000');
})