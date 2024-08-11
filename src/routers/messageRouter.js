import express from "express";
import Message from "../models/message.js";
import { messageSchema } from "../support/validation.js";
import passport from "passport";
import '../middleware/passport.js';

const router = express.Router();

// Get all messages
router.get("/get", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const messages = await Message.find();  // This is correctly using async/await
        res.json({ messages });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

// Send a new message
router.post("/sendMessage", async (req, res) => {
    try {
        const validationResult = await messageSchema.validateAsync(req.body);  // Validate request data
        const message = new Message({
            name: validationResult.name,
            email: validationResult.email,
            subject: validationResult.subject,
            message: validationResult.message
        });
        await message.save();  // Save the message using async/await
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Delete a message by ID
router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Message.deleteOne({ _id: id });  // Delete the message using async/await
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Message not found' });
        } else {
            res.status(200).json({ message: 'Message deleted successfully' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

export default router;
