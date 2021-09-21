require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

//! enable method override
app.use(methodOverride('_method'));

//! serves the public folder as static
app.use(express.static('public'));

//! urlencoded into order to receive data from forms
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
