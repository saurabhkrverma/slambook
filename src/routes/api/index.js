import express from "express";
import registerUserRouter from "./user";
import registerQuestionnaireRouter from "./collection";
import registerRequestRouter from "./request"
// import registerWriteupNotificationRouter from "./writeupNotification"
import { buildResponse } from '../../utils/responseBuilder'

const router = express.Router();

registerUserRouter(router);
registerQuestionnaireRouter(router);
registerRequestRouter(router);
// registerWriteupNotificationRouter(router);

router.get('/initialiseApp', async(req,res) => res.send(buildResponse(req)));

export default router;
