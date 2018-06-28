const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema ({
    public: {
        type: Boolean,
        default: true,
        enum: [true, false]
    },
    name: String,
    genre: String,
    country: String,
    director: String,
    description: String
});

const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;