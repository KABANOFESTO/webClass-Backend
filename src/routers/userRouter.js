import express from "express";
import { createUserSchema, loginUserSchema } from "../support/validation.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, "my-token-secret", { expiresIn: '30d' });
};

// Middleware to protect routes and check for admin role
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, "my-token-secret");
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ "success": false, message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ "success": false, message: "Not authorized, no token" });
    }
};

// Admin-only route to get all users
router.get('/users', protect, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);

        if (currentUser.role !== 'admin') {
            return res.status(403).json({ "success": false, message: "Access denied" });
        }

        const users = await User.find({});
        res.json({ "success": true, users });
    } catch (error) {
        res.status(500).json({ "success": false, message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const validationResult = await createUserSchema.validateAsync(req.body);
        const userExist = await User.findOne({ email: validationResult.email });
        if (userExist) {
            res.status(400).json({ "success": false, message: "User already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(validationResult.password, salt);
            const user = new User({
                username: validationResult.username,
                email: validationResult.email,
                password: hashedPassword,
                role: 'vistor'
            });
            await user.save();
            res.status(201).json({
                "success": true,
                "user": {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user)
                }
            });
        }
    } catch (error) {
        res.status(400).json({ "success": false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const validationResult = await loginUserSchema.validateAsync(req.body);
        const { email, password } = validationResult;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                "success": true,
                "user": {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user)
                }
            });
        } else {
            res.status(400).json({ "success": false, message: "Invalid credentials, please try again!" });
        }
    } catch (error) {
        res.status(400).json({ "success": false, message: error.message });
    }
});

export default router;
