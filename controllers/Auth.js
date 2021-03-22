const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const User=require("../models/User")


const signup=async(req,res,next)=> {
    
    const {username,password:plainTextPassword}=req.body;
    if(!username || typeof username!== 'string') {
        req.error="Invalid Username"
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        req.error="Invalid Password";
    }
    if(plainTextPassword.length<6) {
        req.error="Password should be atleast 6 characters long."
    }

    const password=await bcrypt.hash(plainTextPassword,10);

    try {
        await User.sync()
        const user=await User.create({
            username:username,
            password:password
        })
        req.data=user.dataValues
        next()
    }
    catch(err) {
        next(err)
    }


}

const login=async(req,res,next)=> {
    const {username,password:plainTextPassword}=req.body;

    try {
        const usr=await User.findAll({
            where:{
                username:username
            }
        })
        const user=usr[0].dataValues
        console.log(user)
    
        if(user===undefined) {
            console.log("invalid user")
            req.error="No User matched the given credentials."
        }
        if(await bcrypt.compare(plainTextPassword,user.password)) {
            const token=jwt.sign({
                id:user.id,
                username:user.username
            },process.env.JWT_TOKEN_SECRET)
            console.log(token)
            req.data=token;
            next();
        }
        req.error="Invalid Input.";
        next();
    }
    catch(err) {
        console.log(err)
        next(err)
    }


}

const authenticateToken=async(req,res,next)=> {
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null)  return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_TOKEN_SECRET,(err,user)=> {
        
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    })

}

module.exports={signup:signup,login:login,authenticateToken:authenticateToken}