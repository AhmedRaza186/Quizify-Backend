import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index to ensure a user only has one progress record per quiz
ProgressSchema.index({ userId: 1, subCategory: 1, quizId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', ProgressSchema);
export default Progress;
