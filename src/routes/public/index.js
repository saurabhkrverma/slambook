import express from "express";
import registerPostRouter from "./post";
import resetInfoRouter from "./reset";

const router = express.Router();

registerPostRouter(router);
resetInfoRouter(router);

export default router;
