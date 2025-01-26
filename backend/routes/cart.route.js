import express from 'express';

import {
  addToCart,
  getUserCart,
  updateCart,
} from '../controllers/cart.controller.js';
import authUserMiddleware from '../middleware/auth.middleware.js';

const cartRouter = express.Router();

cartRouter.post('/get', authUserMiddleware, getUserCart);
cartRouter.post('/add', authUserMiddleware, addToCart);
cartRouter.post('/update', authUserMiddleware, updateCart);

export default cartRouter;
