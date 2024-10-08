import express from "express";
import Booking from "../models/bookingModel.js";
import { bookingSchema } from "../support/validation.js";
import passport from "passport";
import '../middleware/passport.js';

const router = express.Router();

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};

// Middleware to check if user is authenticated
const isAuthenticated = passport.authenticate("jwt", { session: false });

// Route for visitors to create a booking
router.post('/book', async (req, res) => {
    try {
        // Check if there's any custom validation here
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for admins to view all bookings
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for admins to delete a booking
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
