/** 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Name of the workout.
 *         intensity:
 *           type: string
 *           description: Intensity level of the workout.
 *         type:
 *           type: string
 *           description: Type of the workout.
 *         duration:
 *           type: number
 *           description: Duration of the workout in minutes.
 *         calories:
 *           type: number
 *           description: Calories burned in the workout.
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ExerciseInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         sets:
 *           type: number
 *         reps:
 *           type: number
 *         rest:
 *           type: number
 *         muscleGroup:
 *           type: string
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
 * /workout:
 *   post:
 *     summary: Create a new workout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the workout.
 *               intensity:
 *                 type: string
 *                 description: Intensity level of the workout.
 *               type:
 *                 type: string
 *                 description: Type of the workout.
 *               duration:
 *                 type: number
 *                 description: Duration of the workout in minutes.
 *               calories:
 *                 type: number
 *                 description: Calories burned in the workout.
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       format: int64
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     sets:
 *                       type: number
 *                     reps:
 *                       type: number
 *                     rest:
 *                       type: number
 *                     muscleGroup:
 *                       type: string
 *     responses:
 *       200:
 *         description: Successfully created workout.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Error creating workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: "User not found"
 */
workoutRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newWorkout = await workoutService.createWorkout(req.body);
        res.status(200).json(newWorkout);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /workout/{workoutId}/exercise/{exerciseId}:
 *   post:
 *     summary: Add an exercise to an existing workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         description: ID of the workout.
 *         schema:
 *           type: number
 *           format: int64
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         description: ID of the exercise to add to the workout.
 *         schema:
 *           type: number
 *           format: int64
 *     responses:
 *       200:
 *         description: Successfully added exercise to workout.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Error adding exercise to workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: "Workout or Exercise does not exist"
 */
workoutRouter.post('/:workoutId/exercise/:exerciseId', async (req: Request, res: Response, next: NextFunction) => {
    const workoutId = parseInt(req.params.workoutId);
    const exerciseId = parseInt(req.params.exerciseId);

    try {
        const updatedWorkout = await workoutService.addExerciseToWorkout(workoutId, exerciseId);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

export { workoutRouter };
