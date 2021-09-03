import mongoose from 'mongoose'

const loginSchema = mongoose.Schema({
    username:String,
    password:String,
    isadmin:Boolean,
    informodel:{type:mongoose.Schema.Types.ObjectId}
})

export default  mongoose.model('loginData',loginSchema)