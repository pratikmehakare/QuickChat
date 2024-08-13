const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { app, server } = require('./socket/index');
require('dotenv').config(); 

const ConnectDb = require('./config/db');
const route = require('./routes/user.routes');

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1', route);

// Connect to Database
ConnectDb();

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`);
});
