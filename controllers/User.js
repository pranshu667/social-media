const User=require("../models/User");
const fs=require("fs");


const createUser=async(req,res,next)=> {
    

    try {
        let {firstName,lastName}=req.body;

    
        await User.sync()
        const user=await User.create({
            firstName:firstName,
            lastName:lastName
        })

        req.data=user.dataValues
        next();
    }
    catch(err) {
        next(err)
    }
    

}

const findUser=async (req,res,next)=> {
    try {
        let users=await User.findAll({
            where:{
                firstName:"Pranshu"
            }
        })
        req.data=users
        next()
    }
    catch(err) {
        next(err)
    }

}





module.exports={createUser:createUser,findUser:findUser}