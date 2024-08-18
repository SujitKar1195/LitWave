import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRouter from './routes/users.route.js';
import bookRouter from './routes/books.route.js';
import favouriteRouter from './routes/favourites.route.js';

import connectDB from './connections/connect.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/orders.route.js';

const corsOptions = {
  origin: process.env.ORIGIN_URI,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/favourites', favouriteRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server is running on port ${port}`);
});
