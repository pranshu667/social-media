const router =require("express").Router();
const {findPosts,createPosts,findPostsByUserId,findPostsById}=require("../controllers/Post");
const upload=require("../utils/Upload");
const {authenticateToken}=require("../controllers/Auth")

router.get("/",findPosts,(req,res)=> {
    
    res.send(req.data)
})
router.get("users/:id",findPostsByUserId,(req,res)=> {
    
    res.send(req.data);
});
router.get("/:id",findPostsById,(req,res)=> {
    if(req.error) {
        res.send(req.error)
    }
    else {
        res.send(req.data)
    }
})

router.post("/",authenticateToken,upload.single('file'),createPosts,(req,res)=> {
    res.send(req.data)
})


module.exports=router;