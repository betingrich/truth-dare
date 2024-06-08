const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/messages', (req, res) => {
    const { user, game, answer } = req.body;

    if (!user || !game || !answer) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const messages = JSON.parse(fs.readFileSync('messages.json', 'utf-8'));
    messages.push({ user, game, answer });

    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

    res.status(201).json({ message: 'Message received' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
