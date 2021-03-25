
const db=require("../models/index")
const User=db.User
let {Op}=require("sequelize")





const findUser=async (req,res,next)=> {
    try {
        let {query}=req;
        let {username}=query 
        if(username === undefined) {
            username="";
        }
        username+='%'
        console.log(username)
        let user=await User.findAll({
            where:{
                username:{
                    [Op.like]:username
                }
            }
        })

        
        req.data=user
        next()
    }
    catch(err) {
        console.log(err)
        next(err)
    }

}





module.exports={findUser:findUser}