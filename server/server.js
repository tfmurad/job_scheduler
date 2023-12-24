const express = require('express');
const agenda = require('./agendaSetup');
const cors = require('cors');
const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { userId } = req.body;

    await agenda.start();
    await agenda.schedule('in 2 seconds', 'send message', { userId, message: 'First message' });
    await agenda.schedule('in 4 seconds', 'send message', { userId, message: 'Second message' });
    await agenda.schedule('in 10 seconds', 'send message', { userId, message: 'Third message' });

    res.status(200).json({ message: 'Messages scheduled' });
});

app.post('/cancel', async (req, res) => {
    const { userId } = req.body;

    await agenda.cancel({ 'data.userId': userId });
    res.status(200).json({ message: 'Messages cancelled' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
