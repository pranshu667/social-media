const router =require("express").Router();
const {findUser}=require("../controllers/User");

router.get("/",findUser,(req,res)=> {
    res.send(req.data);
});


module.exports=router;
