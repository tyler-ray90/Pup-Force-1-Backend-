///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require('dotenv').config();
const cors = require('cors');

// pull PORT from .env, give default value of 3001
const { PORT = 3001, MONGODB_URL } = process.env;
// import express
const express = require('express');
// create application object
const app = express();

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {
    // @ts-ignore
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on('open', () => console.log('You are connected to Mongo'))
    .on('close', () => console.log('You are disconnected from mongo'))
    .on('error', (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////

const FoodSchema = new mongoose.Schema({
    food: { type: String, required: true, unique: true },
    data: {
        type: [
            {
                animal: { type: String, required: true },
                edible: { type: String, required: true },
                notes: { type: String, default: '' },
            },
        ],
        default: [],
    },
});

const Food = mongoose.model('Food', FoodSchema);

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors());
app.use(express.json());
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get('/', (req, res) => {
    res.send('hello world');
});

// reset route
app.get('/reset', async (req, res) => {
    await Food.deleteMany({});
    res.json({
        message: 'database reset',
    });
});

// INDEX ROUTE - DISPLAYS ALL
app.get('/food', async (req, res) => {
    try {
        res.json(await Food.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Food Create Route
//? don't see your pet/food pair and what to add or edit the database? Enter your animal type and a food, then check off whether its poisonous. Feel free to add some notes.
app.post('/food', async (req, res) => {
    // const { food, animal, edible, notes } = req.body;
    let existingFood = await Food.findOne({ food: req.body.food });
    if (existingFood) {
        let index = 0;
        let existingInfo = existingFood.data.find((info, i) => {
            if (info.animal === req.body.animal) {
                index = i;
                return true;
            }
            return false;
        });
        if (existingInfo) {
            let oldInfo = { ...existingFood.data[index] }._doc;
            existingFood.data[index] = {
                animal: oldInfo.animal,
                edible: req.body.edible ?? oldInfo.edible,
                notes: req.body.notes ?? oldInfo.notes,
            };
        } else {
            if (!req.body.animal || !req.body.edible) {
                res.status(400).json({
                    message:
                        'you need to defined animal name, food and whether or not it is edible at minimum',
                });
                return;
            }
            existingFood.data.push({
                animal: req.body.animal,
                edible: req.body.edible,
                notes: req.body.notes,
            });
        }

        try {
            res.json(
                await Food.findOneAndUpdate(
                    { food: req.body.food },
                    { data: existingFood.data },
                    { new: true }
                )
            );
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        try {
            const newFood = await Food.create({
                food: req.body.food,
                data: [
                    {
                        animal: req.body.animal,
                        edible: req.body.edible,
                        notes: req.body.notes,
                    },
                ],
            });
            res.json(newFood);
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
