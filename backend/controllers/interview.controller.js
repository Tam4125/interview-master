import Interview from "../models/interview.model.js";

export const getInterviewByUserId = async (req, res, next) => {
    try {
        const user = req.user;
        const interviewsByUserId = await Interview.find({userId: user._id});

        res.status(200).json({success: true, interviews: interviewsByUserId});
    } catch (error) {
        next(error);
    }
}

