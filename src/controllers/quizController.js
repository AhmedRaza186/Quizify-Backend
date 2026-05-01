import { quizData } from '../../quizData.js';
import Progress from '../models/progressSchema.js';
import User from '../models/userSchema.js';
import responseHandler from '../utils/responseHandle.js';

// Get all categories and their sub-categories (topics)
export const getCategories = async (req, res) => {
    try {
        const categories = quizData.categories.map(cat => ({
            title: cat.title,
            subCategories: Object.keys(cat.topics)
        }));
        return responseHandler(res, 200, true, 'Categories retrieved', categories);
    } catch (error) {
        return responseHandler(res, 500, false, error.message);
    }
};

// Get quiz cards for a specific topic/sub-category
export const getQuizzesBySubCategory = async (req, res) => {
    try {
        const { subName } = req.params;
        let cards = null;

        // Search for the subcategory in all categories
        for (const cat of quizData.categories) {
            if (cat.topics[subName]) {
                cards = cat.topics[subName];
                break;
            }
        }

        if (!cards) {
            return responseHandler(res, 404, false, 'Sub-category not found');
        }

        // Add 'order' property if missing (using index)
        const cardsWithOrder = cards.map((card, index) => ({
            ...card,
            order: index
        }));

        return responseHandler(res, 200, true, 'Quiz cards retrieved', cardsWithOrder);
    } catch (error) {
        return responseHandler(res, 500, false, error.message);
    }
};

// Save user progress for a quiz
export const saveProgress = async (req, res) => {
    try {
        const { subCategory, quizId, percentage } = req.body;
        const userId = req.user._id;

        const progress = await Progress.findOneAndUpdate(
            { userId, subCategory, quizId },
            { percentage, isCompleted: true, completedAt: new Date() },
            { upsert: true, new: true }
        );

        // Update user's aggregate stats
        const allProgress = await Progress.find({ userId });
        const quizPlayed = allProgress.length;
        const totalPercentage = allProgress.reduce((sum, p) => sum + p.percentage, 0);
        const avgProgress = Math.round(totalPercentage / quizPlayed);

        await User.findByIdAndUpdate(userId, {
            $set: { 
                'progress': avgProgress,
                'quizPlayed': quizPlayed
            }
        });

        return responseHandler(res, 200, true, 'Progress saved', progress);
    } catch (error) {
        return responseHandler(res, 500, false, error.message);
    }
};

// Get all progress for a user in a specific sub-category
export const getProgress = async (req, res) => {
    try {
        const { subName } = req.query;
        const userId = req.user._id;

        const query = { userId };
        if (subName) query.subCategory = subName;

        const progressList = await Progress.find(query);
        
        // Format as an object keyed by quizId (to match frontend expectations)
        const progressMap = {};
        progressList.forEach(p => {
            progressMap[p.quizId] = {
                percentage: p.percentage,
                isCompleted: p.isCompleted,
                completedAt: p.completedAt
            };
        });

        return responseHandler(res, 200, true, 'Progress retrieved', progressMap);
    } catch (error) {
        return responseHandler(res, 500, false, error.message);
    }
};
