const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.spot.user];

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};