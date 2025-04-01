// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment'); // Import the Comment model
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'commentsDB'; // Database name
const collectionName = 'comments'; // Collection name
const PORT = 3000;
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory
// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
// Middleware to parse JSON data
app.use(bodyParser.json());
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static('public')); // Serve static files from the public directory
// Middleware to handle CORS
app.use(cors(corsOptions));
// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});