import express from "express";
import registerPostRouter from "./post";

const router = express.Router();

registerPostRouter(router);

export default router;
