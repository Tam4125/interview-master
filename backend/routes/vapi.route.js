import {Router} from "express";
import {createInterview} from "../controllers/vapi.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/upload.middleware.js";

const vapiRouter = Router();

vapiRouter.get('/generate', (req, res) => res.send({success: true, data:"Hello"}));
vapiRouter.post('/generate-interview', authorize, upload.single("cv"), createInterview);

export default vapiRouter;
