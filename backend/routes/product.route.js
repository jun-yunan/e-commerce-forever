import express from 'express';

import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
} from '../controllers/product.controller.js';
import upload from '../middleware/multer.middleware.js';
import adminAuthMiddleware from '../middleware/adminAuth.middleware.js';

const productRouter = express.Router();

productRouter.post(
  '/add',
  adminAuthMiddleware,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct,
);
productRouter.get('/list', listProducts);
productRouter.post('/single', singleProduct);
productRouter.post('/remove', adminAuthMiddleware, removeProduct);
productRouter.put('/:id', updateProduct);

export default productRouter;
