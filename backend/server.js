
import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import siteConfigRoutes from './routes/siteConfigRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { port } from './secret.js';


connectDB();

const app = express();



const allowedOrigins = [
    'http://localhost:5173',
    'https://nazimblog.netlify.app',
    process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // allow any Vercel preview/production deployment
        if (origin.endsWith('.vercel.app')) return callback(null, true);
        return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// explicitly handle preflight for Vercel serverless
app.options('{*path}', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/site-config', siteConfigRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);


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
