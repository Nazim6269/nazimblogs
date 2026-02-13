import mongoose from 'mongoose';

const reportSchema = mongoose.Schema(
    {
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        targetType: {
            type: String,
            enum: ['blog', 'comment'],
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'dismissed'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

reportSchema.index({ reporter: 1, targetId: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
