const { DataTypes } = require('sequelize')
const {sequelize}=require('./index')

let User= sequelize.define("User",{
    
    username:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    },
    avatar:{
        type:DataTypes.STRING
    },
    dateOfBirth: {
        type:DataTypes.TIME
    }

})
module.exports=User;


