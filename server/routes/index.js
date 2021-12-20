import express from "express";
import registerUserRouter from "./user";
import registerWriteUpRouter from "./writeup";
const router = express.Router();

registerUserRouter(router);
registerWriteUpRouter(router)

module.exports = router;
