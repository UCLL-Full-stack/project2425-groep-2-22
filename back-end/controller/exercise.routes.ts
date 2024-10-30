/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the exercise.
 *         description:
 *           type: string
 *           description: A brief description of the exercise.
 *         sets:
 *           type: number
 *           description: The number of sets for the exercise.
 *         reps:
 *           type: number
 *           description: The number of repetitions for each set.
 *         rest:
 *           type: number
 *           description: The rest time (in seconds) between sets.
 *         muscleGroup:
 *           type: string
 *           description: The muscle group targeted by the exercise.
 */

import express, { NextFunction, Request, Response } from 'express';
import exerciseService from '../service/exercise.service';

const exerciseRouter = express.Router();

/**
 * @swagger
 * /exercise:
 *   get:
 *     summary: Get a list of all exercises.
 *     responses:
 *       200:
 *         description: A list of exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.status(200).json(exercises);
    } catch (error) {
        next(error);
    }
});

export { exerciseRouter };
