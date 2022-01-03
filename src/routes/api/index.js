import express from "express";
import registerUserRouter from "./user";
import registerWriteUpRouter from "./writeup";
import registerWriteupNotificationRouter from "./writeupNotification"
import { buildResponse } from '../../utils/responseBuilder'

const router = express.Router();

registerUserRouter(router);
registerWriteUpRouter(router);
registerWriteupNotificationRouter(router);

router.get('/initialiseApp', async(req,res) => res.send(buildResponse(req)));

export default router;
