import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import jwt from 'jsonwebtoken';

// Secret key for JWT (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Validation rules
export const validateUser = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validateLogin = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').notEmpty().withMessage('Password is required')
];

// Create user function
export async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user with default role if not specified
        const user = new User({ 
            name, 
            email, 
            password,
            role: role || 'user'
        });
        
        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Don't send password in response
        const userToReturn = user.toObject();
        delete userToReturn.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userToReturn,
            token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

// Login function
export async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Don't send password in response
        const userToReturn = user.toObject();
        delete userToReturn.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: userToReturn,
            token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}