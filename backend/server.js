const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());

const mongoURL = process.env.MONGO_URL;
const mongoDB = process.env.MONGO_DB;
const filmCollection = 'films';
const characterCollection = 'characters';
const planetCollection = 'planets';

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const collection = db.collection(planetCollection);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving planets");
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const collection = db.collection(characterCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting characters");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const collection = db.collection(filmCollection);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting films");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const collection = db.collection(characterCollection);
        const characters = await collection.find({id: Number(id)}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);

        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse("hello");
        const jsonObj = {'name':'David'}
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});