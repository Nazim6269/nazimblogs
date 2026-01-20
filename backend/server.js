
import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { port } from './secret.js';


connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('API is running Smoothly');
});


// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the server in development mode
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${port}`);
    });
}


export default app;
