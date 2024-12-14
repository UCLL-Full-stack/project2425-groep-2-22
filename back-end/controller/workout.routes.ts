/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The unique identifier for a workout.
 *         name:
 *           type: string
 *           description: The name of the workout.
 *         intensity:
 *           type: string
 *           description: The intensity level of the workout.
 *         type:
 *           type: string
 *           description: The type of workout (e.g., cardio, strength).
 *         duration:
 *           type: number
 *           description: Duration of the workout in minutes.
 *         calories:
 *           type: number
 *           description: Estimated calories burned.
 *         user:
 *           $ref: '#/components/schemas/User'
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
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

/**
 * @swagger
 * /workout/{id}:
 *   get:
 *     summary: Get a workout by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID.
 *     responses:
 *       200:
 *         description: A workout object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found.
 */
workoutRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await workoutService.getWorkoutById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /workout:
 *   post:
 *     summary: Create a new workout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: The created workout.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Bad request if the input is invalid.
 *       404:
 *         description: User not found if the user ID does not exist.
 */
workoutRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newWorkout = await workoutService.createWorkout(req.body);

        res.status(201).json(newWorkout);
    } catch (error) {
        next(error);
    }
});


export { workoutRouter };
