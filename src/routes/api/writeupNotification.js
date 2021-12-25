import WriteUpNotification from "../../models/writeupNotification";
import User from "../../models/user";

const registerWriteupNotificationRouter = (router) => {

    // get all write-up notifications
    router.get("/wunotification", async(req, res) => {
        const WriteupNotification = await WriteUpNotification.find();
        res.send(WriteupNotification);
    });

    // get write-ups notifications recieved
    router.get("/wunotification/requested/:requester", async(req, res) => {
        try {
            WriteUpNotification.aggregate([{
                $match: {
                    "requester": req.params.requester
                }},{
                $lookup: {
                    "from": "users",
                    "localField": "author",
                    "foreignField": "email",
                    "as": "authorDetails"
                }
            }
            ]).exec((err, result)=>{
                if(err) throw err;
                res.send(result);
            });
        } catch (error) {
            res.send(error);
        }

    });

    // get write-ups notifications sent
    router.get("/wunotification/authored/:author", async(req, res) => {
        try {
            WriteUpNotification.aggregate([{
                $match: {
                    "author": req.params.author
                }},{
                    $lookup: {
                        "from": "users",
                        "localField": "requester",
                        "foreignField": "email",
                        "as": "requesterDetails"
                    }
                }
            ]).exec((err, result)=>{
                if(err) throw err;
                res.send(result);
            });
        } catch (error) {
            res.send(error);
        }

    });

    // add WriteupNotification notification
    router.post("/wunotification", async(req,res) => {
        try {
            const author = await User.find({email:req.body.author});
            if(Array.isArray(author) && author.length === 0){
                res.status(400).send(new Error('No user with email provided'));
            } else {
                const WriteupNotification = new WriteUpNotification({
                    _id: {
                        requester: req.body.requester,
                        author: req.body.author,
                    },
                    requester: req.body.requester,
                    author: req.body.author
                });
                await WriteupNotification.save();
                res.send(WriteupNotification);
            }
        } catch (error) {
            res.send(error);
        }

    });

    // delete WriteupNotification notification
    router.delete("/wunotification/:author/:requester", async(req,res)=>{
        try{
            const WriteupNotification = await WriteUpNotification.deleteOne({
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

export default registerWriteupNotificationRouter;
