import express from 'express';
import mongoose from 'mongoose';
const routes =  require('./server/routes');
const app = express();

app.use(express.json());
app.use("/api", routes);
app.use("/", (req,res)=>{
    res.send("welcome to scrapbook !!");
})

mongoose
    .connect("mongodb+srv://sauraverma:Dushyant%407@cluster0.ppbaa.mongodb.net/scrapbook?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(()=>{
        console.log("db connect up and running bro");
        app.listen((process.env.PORT || 5000), () =>{
            console.log("server is running on port 5000")
        })
    });






