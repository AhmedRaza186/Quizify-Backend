import { 
    signupController, 
    verifyOtpController, 
    loginController, 
    resendOtpController 
} from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

router.post('/signup', signupController);
router.post('/verify-otp', verifyOtpController);
router.post('/login', loginController);
router.post('/resend-otp', resendOtpController);
// router.get('/me', protect, getMeController);
// router.patch('/profile', protect, updateProfileController);

export default router;