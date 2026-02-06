import mongoose from 'mongoose';

const pendingOTPSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: auto-delete after 10 minutes
});

const PendingOTP = mongoose.model('PendingOTP', pendingOTPSchema);

export default PendingOTP;
