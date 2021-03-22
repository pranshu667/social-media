const router =require("express").Router();
const {findPosts,createPosts}=require("../controllers/Post");
const upload=require("../utils/Upload");
const {authenticateToken}=require("../controllers/Auth")

router.get("/",findPosts,(req,res)=> {
    
    res.send(req.data)
})

router.post("/",authenticateToken,upload.single('file'),createPosts,(req,res)=> {
    res.send(req.file || req.data)
})


module.exports=router;