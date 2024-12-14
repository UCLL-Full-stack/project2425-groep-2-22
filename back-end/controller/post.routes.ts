/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The unique identifier for a post.
 *         title:
 *           type: string
 *           description: The title of the post.
 *         description:
 *           type: string
 *           description: A brief description of the post.
 *         rating:
 *           type: number
 *           format: float
 *           description: The rating of the post, ranging from 0 to 5.
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the post was created.
 */
import express, { NextFunction, Request, Response } from 'express';
import postService from '../service/post.service';

const postRouter = express.Router();

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get a list of all posts.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The post ID.
 *     responses:
 *       200:
 *         description: A post object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found.
 */
postRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await postService.getPostById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request if the input is invalid.
 */
postRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newPost = await postService.createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

export { postRouter };
