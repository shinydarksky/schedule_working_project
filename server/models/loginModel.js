import mongoose from 'mongoose'

const loginSchema = mongoose.Schema({
    username:String,
    password:String,
    isadmin:Boolean,
    fullname:{ type:String, default: ''},
    salary:{type:Number,default:30000}
})

export default  mongoose.model('loginData',loginSchema)