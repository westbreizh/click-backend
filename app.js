//const rateLimit = require("./middleware/rate-limit");
const userRoutes = require('./routes/user');
const clubRoutes = require('./routes/club');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')

const express = require('express');

const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet({
  crossOriginResourcePolicy: false,
}));


app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/stripe', stripeRoutes);








module.exports = app;
