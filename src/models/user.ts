import mongoose from 'mongoose';

// Define the user schema with required fields.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student',
    },
});

// Create a mongoose model based on the user schema.
const User = mongoose.model('User', userSchema);

export default User;
