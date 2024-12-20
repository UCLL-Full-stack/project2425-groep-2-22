import jwt from 'jsonwebtoken'
import { Role } from '../types';

const generateJWTtoken = ({username, role}: {username: string, role: Role}): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'fitness_app' }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables.');
        }
        return jwt.sign({username, role}, process.env.JWT_SECRET, options)
    } catch (error) {
        console.log(error)
        throw new Error('Error generating JWT token, see server log for details.')
    }
};

export { generateJWTtoken }