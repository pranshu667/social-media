const router =require("express").Router();
const {findUser}=require("../controllers/User");

const {authenticateDbConnection}=require("../models/index")


router.get("/",findUser,(req,res)=> {
    
    res.send(req.data)
});




module.exports=router;
