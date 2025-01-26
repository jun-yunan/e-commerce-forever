import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './config/mongodb.config.js';
import connectCloudinary from './config/cloudinary.config.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(cors());

//API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`);
  await connectDb();
  await connectCloudinary();
});
