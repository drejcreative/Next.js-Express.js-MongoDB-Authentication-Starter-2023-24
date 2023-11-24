import './config/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db';

connectDB();

//Import Routes
import auth from './services/auth/routes/auth';

// ----------------------------------
// Express configuration
// ----------------------------------
const app = express();

//middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ----------------------------------
// API Routes
// ----------------------------------
app.use('/api/auth', auth);

// ----------------------------------
// Express server export
// ----------------------------------
export default app;
