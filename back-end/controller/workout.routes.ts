/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Workout:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name of the workout.
 *            intensity:
 *              type: string
 *              description: Intensity level of the workout.
 *            type:
 *              type: string
 *              description: Type of the workout.
 *            duration:
 *              type: number
 *              description: Duration of the workout in minutes.
 *            calories:
 *              type: number
 *              description: Calories burned in the workout.
 *            user:
 *              $ref: '#/components/schemas/User'
 */

import express, { NextFunction, Request, Response } from 'express';
import workoutService from '../service/workout.service';

const workoutRouter = express.Router();

/**
 * @swagger
 * /workout:
 *   get:
 *     summary: Get a list of all workouts.
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 */
workoutRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
});

export { workoutRouter };
