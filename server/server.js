const express = require('express');
const agenda = require('./agendaSetup');
const { User } = require('./mongooseSetup');
const cors = require('cors');
const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());


app.post('/api/register', async (req, res) => {
    try {
      const { name, email } = req.body;
      console.log({ name, email });
  
      const newUser = new User({ name, email, jobs: [] });
  
      await agenda.start();
      const job1 = await agenda.schedule('in 2 seconds', 'send message', { userId: newUser._id, message: 'First message' });
      const job2 = await agenda.schedule('in 4 seconds', 'send message', { userId: newUser._id, message: 'Second message' });
      const job3 = await agenda.schedule('in 10 seconds', 'send message', { userId: newUser._id, message: 'Third message' });
  
      newUser.jobs.push(job1.attrs._id, job2.attrs._id, job3.attrs._id);
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  });
  

// app.post('/register', async (req, res) => {
//     const { userId } = req.body;

//     await agenda.start();
//     await agenda.schedule('in 2 seconds', 'send message', { userId, message: 'First message' });
//     await agenda.schedule('in 4 seconds', 'send message', { userId, message: 'Second message' });
//     await agenda.schedule('in 10 seconds', 'send message', { userId, message: 'Third message' });

//     res.status(200).json({ message: 'Messages scheduled' });
// });

// app.post('/cancel', async (req, res) => {
//     const { userId } = req.body;

//     await agenda.cancel({ 'data.userId': userId });
//     res.status(200).json({ message: 'Messages cancelled' });
// });
  
app.post('/api/cancel', async (req, res) => {
    const { userId:userName } = req.body;

    try {
        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await agenda.cancel({ 'data.userId': user._id });
        user.jobs = [];
        await user.save();

        res.status(200).json({ message: 'Messages cancelled and user jobs array cleared' });
    } catch (error) {
        console.error('Error cancelling jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
