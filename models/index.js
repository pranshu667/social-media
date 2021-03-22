const {Sequelize,DataTypes}=require('sequelize');
require("dotenv").config()

const connectionString=`postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const sequelize=new Sequelize(connectionString);

const authenticateDbConnection=async (req,res,next)=> {
    try {
        await sequelize.authenticate();
        return next()
    }
    catch(err) {
        
        return  next(err)
    }
}

module.exports={sequelize:sequelize,authenticateDbConnection:authenticateDbConnection};