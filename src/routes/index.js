import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import { DIST_DIR } from '../../index';

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);

router.get("/post/:collectionId", async (req,res)=> {
    res.send("share it with others");
});

router.get("/submit/post", async (req,res)=> {
res.send("ok");
});

router.get("*", (req,res)=>{
    res.sendFile('./index.html', { root: DIST_DIR });
});

module.exports = router;
