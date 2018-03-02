const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
