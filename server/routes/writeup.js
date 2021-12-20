import WriteUp from "../models/writeup";
import moongoose from "mongoose";


const registerWriteUpRouter = (router) => {
    // get all writeups
    router.get("/writeup", async(req, res) => {
        const writeup = await WriteUp.find();
        res.send(writeup);
    });

    // get writeup
    router.get("/writeup/:user", async(req, res) => {
        try {
            const writeUp = await WriteUp.find({"user": req.params.user});
            res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // get writeup aggregate
    router.get("/writeup/aggregate/:user", async(req, res) => {
        try {
            WriteUp.aggregate([
                {
                    $match: {
                        "user": req.params.user
                    }
                },
                {
                    $lookup: {
                        "from": "users",
                        "localField": "author",
                        "foreignField": "email",
                        "as": "authorDetails"
                    }
                }
            ]).exec(function(err, result){
                if(err) throw err;
                res.send(result);
            })
        } catch (error) {
            res.send(error);
        }

    });

    // get writeup
    router.get("/writeup/:user/:author", async(req, res) => {
        try {
            const writeUp = await WriteUp.find({
                "_id" :{
                    "user": req.params.user,
                    "author": req.params.author
                }
            });
            res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // add writeup
    router.post("/writeup", async(req,res) => {
        try {
            const writeUp = new WriteUp({
                _id: {
                    user: req.body.user,
                    author: req.body.author,
                },
                user: req.body.user,
                author: req.body.author,
                message: req.body.message
            });
            await writeUp.save();
            res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // delete user
    router.delete("/writeup/:user/:author", async(req,res)=>{
        try{
            console.log(req.params.user, req.params.author);
            const writeUp = await WriteUp.deleteOne({
                "_id" :{
                    "user": req.params.user,
                    "author": req.params.author
                }
            });
            res.status(204).send();
        } catch (error) {

            res.send(error);
        }
    });
};

export default registerWriteUpRouter;
