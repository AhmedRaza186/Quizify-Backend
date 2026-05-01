import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters']
    },
    lastName: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        unique: true
    },

    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters']
    },
    profilePic: {
        type: String,
        default: null
    },
    otp: {
        type: Number,
    },
    otpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otpResendCount: {
        type: Number,
        default: 0
    },
    lastOtpResend: {
        type: Date,
    },
    progress: {
        type: Number,
        default: 0
    },
    quizPlayed: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('Users', UserSchema, 'Users')
export default User;
