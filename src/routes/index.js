import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import { DIST_DIR } from '../../index';

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);

router.get("/request/:collectionId", (req,res)=> {
    if(req.session) {
        req.session.request = req.params.collectionId;
    }
    req.redirect("/");
});

router.get("*", (req,res)=>{
    res.sendFile('./index.html', { root: DIST_DIR });
});

module.exports = router;
