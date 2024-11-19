// Create web server with Express
// npm install express
// npm install body-parser
// npm install nodemon
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');

app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({error: 'Comment not found'});
    }
    res.json(comment);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({error: 'Comment not found'});
    }
    comment.body = req.body.body;
    res.json(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({error: 'Comment not found'});
    }
    comments.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// npm install nodemon