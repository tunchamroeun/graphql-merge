const mongoose = require('mongoose');
const localUri = 'mongodb://localhost/book-management';
const connection = mongoose.connect(localUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
module.exports = connection;
