// Load env variables
if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}

// Import Dependecies
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/connectToDB");
const notesController = require('./controllers/notesController' );
const usersController = require('./controllers/usersController' );
const requireAuth = require('./middleware/requireAuth');

// Create a express app
const app = express();

// Configure an expess app
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to databas
connectToDB();

// Routing
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth);

app.get('/notes', notesController.fetchNotes);
app.get('/notes/:id', notesController.fetchNote);
app.post('/notes', notesController.createNote);
app.put('/notes/:id', notesController.updateNote);
app.delete('/notes/:id', notesController.deleteNote);

// Start server
app.listen(process.env.PORT);