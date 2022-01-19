import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import publicRouter from "./public";
import { DIST_DIR } from '../../index';

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);
router.use("/public", publicRouter);

router.get("*", (req,res)=>{
    res.sendFile('./index.html', { root: DIST_DIR });
});

module.exports = router;
