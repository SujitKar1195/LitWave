import express from 'express';
import 'dotenv/config';

import userRouter from './routes/users.route.js';
import bookRouter from './routes/books.route.js';
import favouriteRouter from './routes/favourites.route.js';

import connectDB from './connections/connect.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/orders.route.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', bookRouter);
app.use('/api/v1', favouriteRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1', orderRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server is running on port ${port}`);
});
