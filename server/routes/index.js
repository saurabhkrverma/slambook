import express from "express";
import registerUserRouter from "./user";
import registerWriteUpRouter from "./writeup";
import registerWriteupNotificationRouter from "./writeupNotification"
const router = express.Router();

registerUserRouter(router);
registerWriteUpRouter(router);
registerWriteupNotificationRouter(router);

module.exports = router;
