const mongoose = require('mongoose');
const DATABASE_NAME = 'petify-dev';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`)
.then(() => console.log(`MongoDB connected to ${DATABASE_NAME}...`))
.catch(err => console.log(err));
