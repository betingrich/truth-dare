const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/sendMessage', (req, res) => {
    const { user, message } = req.body;
    const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    messages.push({ user, message });
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
    res.json({ success: true });
});

app.get('/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    res.json(messages);
});

app.use(express.static('../frontend'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

