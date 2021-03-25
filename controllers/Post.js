

const db=require("../models/index");
const {Post,User}=db;



const createPosts=async (req,res,next)=> {
    try {
        
        const description=req.body.description !== undefined ? req.body.description:"This is a dummy description";
        const mediaURL=req.file !== undefined && req.file.location !== undefined  ? req.file.location : "aws.S3.dummy_img_url.amazon.co"
        await Post.sync()
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
        
        
        let posts=await Post.findAll({
            attributes:{
                exclude:['UserId']
            }
            
        });
        
        req.data=posts;
        next();

    }
    catch(err) {
        
        next(err)
    }
}

const findPostsById=async(req,res,next)=> {
    try {
        let {id}=req.params;
        if(id === undefined) {
            req.error="ID is invalid";
            next();
        }

        let posts=await Post.findOne({
            where:{
                id:id
            }
        })
        
        req.data=posts || {message:"We could not fetch anything for you :)"};
        
        next()

    }
    catch(err) {
        next(err)
    }
}

const findPostsByUserId=async (req,res,next)=> {
    
    try {
        
        let {id}=req.params
        if(id !== undefined) {
            req.error={status:"error",err:"ID is Invalid"}
            next();
        }
        let posts=await Post.findAll({
            where:{
                UserId:id
            },
            include:{
                model:User,
                attributes:["username"]
            }
           
        })
        console.log(posts)
        req.data=posts
        next();
    }
    catch(err) {
        next(err)
    }
    
}


module.exports={createPosts,findPosts,findPostsByUserId,findPostsById}