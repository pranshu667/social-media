const express=require("express");

const bodyParser=require("body-parser")
require("dotenv").config();

//routes
const userRoute=require("./routes/User");
const postRoute=require("./routes/Post");
const authRoute=require("./routes/Auth");




const app=express();
const port=process.env.PORT || 5100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use("/users",userRoute);
app.use("/posts",postRoute);
app.use("/auth",authRoute);

app.use((err,req,res,next)=> {
    res.send(err)
})








app.get("/",(req,res)=> {
    res.json({message:"Hello from server"})
});





app.listen(port,()=> {
    console.log("Listening on ",port)
});







