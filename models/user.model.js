import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { 
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
     },
    email: { 
    type: String, 
    required: [true, 'Please provide an email address.'], 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: 6,
        },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

// { name 'John Doe', email: 'johny@email.com, password: 'hashedpassword123' }
