import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

// Make sure we load environment variables
dotenv.config();

// Secret key for JWT (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Check if JWT_SECRET is available
if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET is not set. Using fallback secret. This is not secure for production!');
}

// JWT authentication middleware
export const requireAuth = expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
});

// Role based authorization middleware
export const requireRole = (role) => {
    return (req, res, next) => {
        if (req.auth.role !== role) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: insufficient permissions'
            });
        }
        next();
    };
};