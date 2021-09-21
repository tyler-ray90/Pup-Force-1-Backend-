require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.json());
app.use(cors());









app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));