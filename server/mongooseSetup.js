// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/SchedulerDB').then(() => {
//     console.log('MongoDB connected');
// }).catch(err => {
//     console.error('MongoDB connection error:', err);
// });


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SchedulerDB').then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
