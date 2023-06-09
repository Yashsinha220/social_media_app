const mongoose = require('mongoose')

const {Schema , model} = mongoose


const UserSchema = new Schema ({

    firstName : {
        type:String , 
        required : true,
        min : 2, 
        max: 50
    },
    lastName : {
        type:String , 
        required : true,
        min : 2, 
        max: 50
    },
    email : {
        type:String , 
        required : true, 
        max: 50,
        unique : true
    },
    password : {
        type:String , 
        required : true,
        min : 5, 
    },
    picturePath : {
        type : String ,
        default : ''
    },
    friends : {
        type : Array,
        default : [],
    },
    location : String,
    occupation : String ,
    viewedProfile : Number,
    impressions : Number


} , {timestamps : true , timeseries : true})

const User = new model("users" , UserSchema  )
module.exports = {User}