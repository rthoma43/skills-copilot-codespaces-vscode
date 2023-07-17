// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body parser to parse the json
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send('Comment posted');
        });
    });
});

// Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));