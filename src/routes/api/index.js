import express from "express";
import registerUserRouter from "./user";
import registerQuestionnaireRouter from "./collection";
import registerPostRouter from "./post";
import registerNotificationRouter from "./notification";
import { buildResponse } from '../../utils/responseBuilder'

const router = express.Router();

registerUserRouter(router);
registerQuestionnaireRouter(router);
registerPostRouter(router);
registerNotificationRouter(router);

router.get('/initialiseApp', async(req,res) => res.send(buildResponse(req)));

export default router;
