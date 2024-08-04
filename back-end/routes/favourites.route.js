import express from 'express';
import User from '../models/users.model.js';
import authenticateToken from '../middlewares/usersAuth.auth.js';
const favouriteRouter = express.Router();

export default favouriteRouter;
