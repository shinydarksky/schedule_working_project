import mongoose from 'mongoose'

const inforScheama = mongoose.Schema({
    fullname:{ type:String, default: ''},
    gender:{ type: Boolean, default: false },
    birthday:{ type:Date, default: Date.now},
    salary:{type:Number,default:30000}
})

export default  mongoose.model('informationData',inforScheama)