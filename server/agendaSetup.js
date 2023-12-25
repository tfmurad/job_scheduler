const Agenda = require('agenda');
const mongoose = require('mongoose');
require('./mongooseSetup');
const User = mongoose.model('User'); 
const agenda = new Agenda({ 
    db: { address: 'mongodb://localhost:27017/SchedulerDB', collection: 'agendaJobs' }
});

// agenda.define('send message', async job => {
//     const { userId, message } = job.attrs.data;
//     console.log(`Sending message to user ${userId}: ${message}: ${job.attrs._id}`);
// });

agenda.define('send message', async job => {
    const { userId, message } = job.attrs.data;

    try {
        const user = await User.findOne({ _id: userId });
        if (user) {
            console.log(`Sending message to ${user.name}: ${message} => ${job.attrs._id}`);
        } else {
            console.log(`User with ID ${userId} not found.`);
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
});

module.exports = agenda;
