const Agenda = require('agenda');
require('./mongooseSetup'); // Ensures MongoDB connection is established

const agenda = new Agenda({ 
    db: { address: 'mongodb://localhost:27017/SchedulerDB', collection: 'agendaJobs' }
});

agenda.define('send message', async job => {
    const { userId, message } = job.attrs.data;
    // Implement your message sending logic here
    console.log(`Sending message to user ${userId}: ${message}`);
});

module.exports = agenda;
