import express, { NextFunction, Request, Response } from 'express';
import exerciseService from '../service/exercise.service';

const exerciseRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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

/**
 * @swagger
 * /exercise:
 *   get:
 *     summary: Get a list of all exercises.
 *     security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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
        const exercise = await exerciseService.getExerciseById(Number(req.params.id));
        res.status(200).json(exercise);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /exercise:
 *   post:
 *     summary: Create a new exercise.
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       201:
 *         description: The created exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Bad request if the input is invalid.
 */
exerciseRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercise = await exerciseService.createExercise(req.body);
        res.status(201).json(exercise);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /exercise/{id}:
 *   delete:
 *     summary: Delete an exercise by ID.
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The exercise ID to delete.
 *     responses:
 *       200:
 *         description: The deleted exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found.
 */
exerciseRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercise = await exerciseService.deleteExercise(Number(req.params.id));
        res.status(200).json(exercise);
    } catch (error) {
        next(error);
    }
});


export { exerciseRouter };
