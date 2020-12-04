// boilerplate
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// import middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// import routes
const apiRoute = require('./routes/api');


// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// API ROUTES
app.use('/api', apiRoute);

// SERVER LISTENER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})