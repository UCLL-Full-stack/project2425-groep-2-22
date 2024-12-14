/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The unique identifier for an exercise.
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
 *           description: The number of reps per set.
 *         rest:
 *           type: number
 *           description: The rest period in seconds between sets.
 *         muscleGroup:
 *           type: string
 *           description: The targeted muscle group for the exercise.
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

/**
 * @swagger
 * /exercise/{id}:
 *   get:
 *     summary: Get an exercise by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The exercise ID.
 *     responses:
 *       200:
 *         description: An exercise object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found.
 */
exerciseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await exerciseService.getExerciseById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { exerciseRouter };
