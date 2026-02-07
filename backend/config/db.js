import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Only exit in development; in serverless (production), throw so the request fails gracefully
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error;
    }
};

export default connectDB;
