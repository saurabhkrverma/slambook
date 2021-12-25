import express from "express";
import registerLoginRouter from "./login";
import registerLogoutRouter from "./logout";

const router = express.Router();

registerLoginRouter(router);
registerLogoutRouter(router);

export default router;
