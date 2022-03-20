const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

//loading environment variables
dotenv.config({path: './config/config.env'});

// Connecting The Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

//Enabling CORS
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Linking Routes File
app.use('/api/v1/locations', require('./routes/locations'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);