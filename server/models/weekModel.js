import mongoose from 'mongoose'

const weekSchema = new mongoose.Schema({
    weekname:String,
    weekschedule:{type:mongoose.Schema.Types.ObjectId},
})

export default  mongoose.model('weekData',weekSchema)