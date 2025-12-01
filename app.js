import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './DB/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware to parse JSON and URL-encoded data and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser)

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Error Handling Middleware
app.use(errorMiddleware);

// Test Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server and connect to the database
app.listen( PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
})

export default app;

