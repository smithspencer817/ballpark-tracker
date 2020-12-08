// boilerplate
const express = require('express');
const app = express();

// import middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const apiRoute = require('./routes/api');

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}

// API ROUTES
app.use('/api', apiRoute);

// SERVER LISTENER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});