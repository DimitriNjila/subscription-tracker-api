/* eslint-disable no-undef */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import logger from "../config/logger.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    // Implementation for user sign-up
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        // check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error('User already exists with this email');
            error.statusCode = 409;
            throw error;
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUsers = new User([{
            name,
            email,
            password: hashedPassword,
        }], { session });
        const token = jwt.sign({ userId: newUsers[0]}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ 
            success: true,
            message: 'User signed up successfully',
            data: {
                user: newUsers[0],
                token,
            }
         });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        logger.error('Error during user sign-up:', error);
        next(error);
    }

};
export const signIn = async (req, res, next) => {
    // Implementation for user sign-in
}

export const signOut = async (req, res, next) => {
    // Implementation for user sign-out
}