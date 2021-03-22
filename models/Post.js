const { DataTypes } = require('sequelize')

const {sequelize}=require('./index')


let Post=sequelize.define("Post",{
    description: {
        type:DataTypes.STRING,
        
    },
    mediaURL: {
        type:DataTypes.STRING

    }
})

module.exports=Post;