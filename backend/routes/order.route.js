import express from 'express';

import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyPaymentStripe,
} from '../controllers/order.controller.js';
import authUserMiddleware from '../middleware/auth.middleware.js';
import adminAuthMiddleware from '../middleware/adminAuth.middleware.js';
const orderRouter = express.Router();

// ADMIN
orderRouter.post('/list', adminAuthMiddleware, allOrders);
orderRouter.post('/status', adminAuthMiddleware, updateStatus);

// Payment
orderRouter.post('/place', authUserMiddleware, placeOrder);
orderRouter.post('/stripe', authUserMiddleware, placeOrderStripe);
orderRouter.post('/razorpay', authUserMiddleware, placeOrderRazorpay);

// USER
orderRouter.post('/user-orders', authUserMiddleware, userOrders);

// Verify Payment
orderRouter.post('/verify-stripe', authUserMiddleware, verifyPaymentStripe);

export default orderRouter;
