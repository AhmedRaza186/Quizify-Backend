import jwt from 'jsonwebtoken';
import responseHandler from './responseHandle.js';

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer')) {
            return responseHandler(res, 401, false, "Not authorized, no token");
        }

        const actualToken = token.split(" ")[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return responseHandler(res, 401, false, "Not authorized, token failed");
    }
};

export { protect };
