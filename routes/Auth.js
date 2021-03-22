const router=require("express").Router();

const {authenticateDbConnection}=require("../models/index");
const {signup,login}=require("../controllers/Auth")

router.post("/register",signup,(req,res)=> {
    
    if(req.error) {
        res.send({type:"error",error:req.error})
    }
    if(req.data) {
        res.send({type:"data",data:req.data})
    }
})

router.post("/login",login,(req,res)=> {
    
    if(req.error) {
        res.send({type:"error",error:req.error});
    }
    if(req.data) {
        res.send({type:"data",data:req.data});
    }
})
module.exports=router