import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    score : {
        type: Number,
        required: true,
    },
    categoryScores : {
        type: Number,
        required: true,
    },
    strengths: {
        type: String,
        required: true,
    },
    constraint: {
        type: String,
        required: true,
    },
    improvement: {
        type: String,
        required: true,
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;