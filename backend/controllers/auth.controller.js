import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV, SESSION_DURATION} from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {username, email, password} = req.body;

        // Check if user already existed
        const existingUser = await User.findOne({email:email});

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);  // Generate a random salt with 10 rounds (cost factor)
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create([{username, email, password:hash}], {session});
        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User successfully signed up',
            data: {
                token,
                user: newUser[0],
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        // Check user existed ?
        const user = await User.findOne({email:email});

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        // create JWT
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        // set cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            maxAge: SESSION_DURATION * 1000,
            sameSite: "lax",
        });


        res.status(200).json({
            success: true,
            message: 'User successfully signed in',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error);
    }
}
