import {Router} from "express";
import {authorize} from "../middlewares/auth.middleware.js";
import {getInterviewByUserId} from "../controllers/interview.controller.js";

const interviewRouter = Router();

interviewRouter.get('/me',authorize, getInterviewByUserId)

export default interviewRouter;