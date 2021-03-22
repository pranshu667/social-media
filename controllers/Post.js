
const Post=require("../models/Post")

const createPosts=async (req,res,next)=> {
    try {
        
        const description=req.body.description !== undefined ? req.body.description:"This is a dummy description";
        const mediaURL=req.file !== undefined && req.file.location !== undefined  ? req.file.location : "aws.S3.dummy_img_url.amazon.co"
        const post=await Post.create({
            description:description,
            mediaURL:mediaURL
        })
        req.data=post.dataValues;
        next();
    }
    catch(err) {
        next(err);
    }
    
}

const findPosts=async(req,res,next)=> {
    try {
        let {id}=req.query;
        console.log(id);
        let posts=await Post.findAll({
            
        });
        req.data=posts;
        next();

    }
    catch(err) {
        next(err)
    }
}


module.exports={createPosts:createPosts,findPosts:findPosts}