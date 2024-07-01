const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/planets', async (req, res) => {
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