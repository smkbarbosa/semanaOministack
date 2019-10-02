const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        /* Pega o id e referencia de qual model usar */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        /* Pega o id e referencia de qual model usar */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);