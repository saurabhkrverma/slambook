import express from "express";
import apiRouter from "./api";
import authRouter from "./auth"

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);

router.get("*", (req,res)=>{
    res.send("uhhoo, seems like you have taken a wrong turn somewhere !!");
});

module.exports = router;
