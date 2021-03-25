const router=require("express").Router();

router.get("/followers",(req,res)=> {
    res.send("You dont have any followers")
})
module.exports=router;