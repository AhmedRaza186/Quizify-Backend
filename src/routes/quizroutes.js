import express from 'express';
import { getCategories, getQuizzesBySubCategory, saveProgress, getProgress } from '../controllers/quizController.js';
import { protect } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/cards/:subName', getQuizzesBySubCategory);
router.post('/progress', protect, saveProgress);
router.get('/progress', protect, getProgress);

export default router;
