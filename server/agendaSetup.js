const Agenda = require('agenda');
require('./mongooseSetup');
const agenda = new Agenda({ 
    db: { address: 'mongodb://localhost:27017/SchedulerDB', collection: 'jobs' }
});

agenda.define('send message', async job => {
    const { userId, message } = job.attrs.data;
    console.log(`Sending message to user ${userId}: ${message}`);
});

module.exports = agenda;
