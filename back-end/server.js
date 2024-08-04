import express from 'express';
import 'dotenv/config';

import userRouter from './routes/users.route.js';

import connectDB from './connections/connect.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server is running on port ${port}`);
});
