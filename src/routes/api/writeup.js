import WriteUp from "../../models/writeup";

const registerWriteUpRouter = (router) => {

    // get all write-ups
    router.get("/writeup", async(req, res) => {
        const writeup = await WriteUp.find();
        res.send(writeup);
    });

    // get write-ups received
    router.get("/writeup/requested/:requester", async(req, res) => {
        try {
            // const writeUp = await WriteUp.find({"requester": req.params.requester});
            WriteUp.aggregate([{
                    $match: {
                        "requester": req.params.requester
                    }
                }, {
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
            // res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // get write-ups posted
    router.get("/writeup/authored/:author", async(req, res) => {
        try {
            // const writeUp = await WriteUp.find({"author": req.params.author});
            WriteUp.aggregate([{
                $match: {
                    "author": req.params.author
                }
            }, {
                $lookup: {
                    "from": "users",
                    "localField": "requester",
                    "foreignField": "email",
                    "as": "requesterDetails"
                }
            }
            ]).exec(function(err, result){
                if(err) throw err;
                res.send(result);
            })
            // res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // add writeup
    router.post("/writeup", async(req,res) => {
        try {
            const writeUp = new WriteUp({
                _id: {
                    requester: req.body.requester,
                    author: req.body.author,
                },
                requester: req.body.requester,
                author: req.body.author,
                message: req.body.message
            });
            await writeUp.save();
            res.send(writeUp);
        } catch (error) {
            res.send(error);
        }

    });

    // delete writeup
    router.delete("/writeup/:author/:requester", async(req,res)=>{
        try{
            const writeUp = await WriteUp.deleteOne({
                "_id" :{
                    "requester": req.params.requester,
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
