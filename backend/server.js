const { MongoClient, ObjectId } = require('mongodb');
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
        // create connection w/ mongo
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

app.get('/api/characters', async (_req, res) => {
    try {
        // create connection w/ mongo
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

app.get('/api/films', async (_req, res) => {
    try {
        // connect to mongo client
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get all fims data
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
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get character data with specific id
        const characters = db.collection(characterCollection);
        const characterData = await characters.findOne({ id: Number(id) });
        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No Character with id: " + id);
    }
});

app.get('/api/films/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get film data with specifc id
        const films = db.collection(filmCollection);
        const filmData = await films.findOne({ id: Number(id) });
        res.json(filmData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No films with id: " + id);
    }
});

app.get('/api/planets/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get planet data with specific id
        const planets = db.collection(planetCollection);
        const planetData = await planets.findOne({ id: Number(id) });
        res.json(planetData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No planet with that id: " + id);
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    const { id } = req.params;

    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const characters = db.collection(characterCollection);
        const filmsChars = db.collection(filmsCharactersCollection);
        const filmCharIds = await filmsChars.find({ film_id: Number(id) }).toArray();

        // const filmCharacters = filmCharIds.map(item => {
        //     return {
        //         character: charCollection.find({id: item.character_id})
        //     }
        // })
        // console.log(charIds);

        // get list of characters of specific film id
        const characterData = [];
        for (const charId of filmCharIds) {
            const characterObj = await characters.findOne({ id: charId.character_id });
            characterData.push(characterObj);
        }
        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Can't get a list of characters with film's id: " + id);
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    const { id } = req.params;

    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const planets = db.collection(planetCollection);
        const filmsPlanets = db.collection(filmsPlanetsCollection);
        const filmPlanetIds = await filmsPlanets.find({ film_id: Number(id) }).toArray();

        // const planIds = filmPlanIds.map(item => item.planet_id);

        // get list of planets of specific films id
        const planetData = [];
        for (const planetId of filmPlanetIds) {
            const planetObj = await planets.findOne({ id: planetId.planet_id });
            planetData.push(planetObj);
        }
        res.json(planetData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Can't get a list of planets with film's id: " + id);
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    const { id } = req.params;
    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const films = db.collection(filmCollection);
        const filmsChars = db.collection(filmsCharactersCollection);
        const filmsCharsId = await filmsChars.find({ character_id: Number(id) }).toArray();

        console.log(filmsCharsId);

        // get list of films of specifc characters id
        const filmsData = []
        for (const filmId of filmsCharsId) {
            const filmObj = await films.findOne({ id: filmId.film_id });
            filmsData.push(filmObj);
        }
        res.json(filmsData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Can't get a list of films with character id: " + id);
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    const { id } = req.params;
    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const films = db.collection(filmCollection);
        const filmsPlanets = db.collection(filmsPlanetsCollection);
        const filmsPlanetIds = await filmsPlanets.find({ planet_id: Number(id) }).toArray();

        // get list of film of specifc planet id
        const filmData = [];
        for (const filmId of filmsPlanetIds) {
            const filmObj = await films.findOne({ id: filmId.film_id });
            filmData.push(filmObj);
        }
        res.json(filmData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Can't get a list of films with planet id: " + id);
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    const { id } = req.params;
    try {
        // create connection w/ mongo
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);
        const characters = db.collection(characterCollection);

        // get list of chracter of specifc planet
        const characterData = await characters.find({ homeworld: Number(id) }).toArray();
        res.json(characterData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Can't get a list of characters with planet's id" + id);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});