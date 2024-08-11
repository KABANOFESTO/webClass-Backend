import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    date: {  // Changed from 'dateTime' to 'date'
        type: Date,
        required: [true, 'Please provide the date and time']
    },
    destination: {
        type: String,
        required: [true, 'Please select a destination']
        // Removed the enum restriction
    },
    persons: {
        type: Number,
        required: [true, 'Please specify the number of persons'],
        min: [1, 'Number of persons must be at least 1']
    },
    categories: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Kids', /* Add other category options */]
    },
    otherRequest: {
        type: String,
        maxlength: [500, 'Other request cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;