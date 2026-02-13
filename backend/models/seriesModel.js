import mongoose from 'mongoose';

const seriesSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: '' },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    },
    { timestamps: true }
);

const Series = mongoose.model('Series', seriesSchema);
export default Series;
