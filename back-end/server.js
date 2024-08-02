import express from 'express';
import 'dotenv/config';

import connectDB from './connections/connect.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`Server is running on port ${port}`);
});
