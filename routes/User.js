const router =require("express").Router();
const {createUser,findUser}=require("../controllers/User");

const {authenticateDbConnection}=require("../models/index")
router.post("/",createUser,(req,res)=> {
    
    res.send(req.data)
    
});

router.get("/",findUser,(req,res)=> {
    
    res.send(req.data)
});




module.exports=router;
