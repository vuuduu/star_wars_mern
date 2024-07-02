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
const filmsCharactersCollection = 'films_characters';
const filmsPlanetsCollection = 'films_planets';

app.get('/api/planets', async (_req, res) => {
    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        
        // get all planets data
        const planets = db.collection(planetCollection);
        const planetData = await planets.find({}).toArray();
        res.json(planetData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving planets");
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get all characters data
        const characters = db.collection(characterCollection);
        const characterData = await characters.find({}).toArray();
        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting characters");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get all films data
        const films = db.collection(filmCollection);
        const filmData = await films.find({}).toArray();
        res.json(filmData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting films");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get specific character data
        const characters = db.collection(characterCollection);
        const characterData = await characters.findOne({id: Number(id)});
        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No Character with that Id");
    }
});

app.get('/api/films/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get specific film data
        const films = db.collection(filmCollection);
        const filmData = await films.findOne({id: Number(id)});
        res.json(filmData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No films with that ID");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get specific planet data
        const planets = db.collection(planetCollection);
        const planetData = await planets.findOne({id: Number(id)});
        res.json(planetData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No Planet with that ID");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const characters = db.collection(characterCollection);
        const filmsChars = db.collection(filmsCharactersCollection);
        const filmCharIds = await filmsChars.find({film_id: Number(id)}).toArray();

        // const filmCharacters = filmCharIds.map(item => {
        //     return {
        //         character: charCollection.find({id: item.character_id})
        //     }
        // })
        // console.log(charIds);
        const characterData = [];
        for (const character of characters) {
            const characterObj = await .findOne({ id : charId});
            characters.push(character);
        }
        console.log(characters);
    
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No films with that ID");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const collection = db.collection(filmsPlanetsCollection);
        const filmPlanIds = await collection.find({film_id: Number(id)}).toArray();
        const planCollection = db.collection(planetCollection);

        const planIds = filmPlanIds.map(item => item.planet_id);
        
        
        const planets = [];
        for (const planId of planIds) {
            const planet = await planCollection.findOne({ id : planId});
            planets.push(planet);
        }
        console.log(planets);
    
        res.json(planets);
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
        // create connection
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const films = db.collection(characterCollection);

        // Get Data
        const planetid = Number(req.params.id);
        const characterData = await characters.find({homeworld: planetid}).toArray();

        res.json(characterData);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        // create connection
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const characters = db.collection(characterCollection);

        // Get Data
        const planetid = Number(req.params.id);
        const characterData = await characters.find({homeworld: planetid}).toArray();

        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});