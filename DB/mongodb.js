/* eslint-disable no-undef */
import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the DB_URI environment variable inside .env.<development/>production>.local");
}
// Method to connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Successfully connected to the database in ${NODE_ENV} mode.`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
}}

export default connectToDatabase;