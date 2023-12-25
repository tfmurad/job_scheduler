const express = require('express');
const agenda = require('./agendaSetup');
const { User } = require('./mongooseSetup');
const cors = require('cors');
const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());


// app.post('/api/subscribe', async (req, res) => {
//     try {
//       const { name, email } = req.body;
  
//       const newUser = new User({ name, email, jobs: [] });
  
//       await agenda.start();
//       const job1 = await agenda.schedule('in 2 seconds', 'send message', { userId: newUser._id, message: 'First message' });
//       const job2 = await agenda.schedule('in 4 seconds', 'send message', { userId: newUser._id, message: 'Second message' });
//       const job3 = await agenda.schedule('in 10 seconds', 'send message', { userId: newUser._id, message: 'Third message' });
  
//       newUser.jobs.push(job1.attrs._id, job2.attrs._id, job3.attrs._id);
//       await newUser.save();
  
//       res.status(201).json({ message: `Welcome ${name}!!` });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error subscribing user');
//     }
//   });

app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newUser = new User({ name, email, jobs: [] });

    await agenda.start();
    const job1 = await agenda.schedule('in 2 seconds', 'send message', { userId: newUser._id, message: 'First message' });
    const job2 = await agenda.schedule('in 4 seconds', 'send message', { userId: newUser._id, message: 'Second message' });
    const job3 = await agenda.schedule('in 10 seconds', 'send message', { userId: newUser._id, message: 'Third message' });

    newUser.jobs.push(job1.attrs._id, job2.attrs._id, job3.attrs._id);
    await newUser.save();

    res.status(201).json({ message: `Welcome ${name}!!` });
  } catch (error) {
    // console.error(error);
    res.status(500).send('Error subscribing user');
  }
});

  
app.post('/api/unsubscribe', async (req, res) => {
    const { userEmail } = req.body;
    console.log(userEmail)

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await agenda.cancel({ 'data.userId': user._id });
        user.jobs = [];
        await user.save();

        res.status(200).json({ message: `Farewell, ${user.name}!!` });
    } catch (error) {
        console.error('Error cancelling jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
