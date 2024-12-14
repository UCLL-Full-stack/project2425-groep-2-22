/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user (hashed).
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/username/{username}:
 *   get:
 *     summary: Get a user by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userService.createUser( req.body );
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
