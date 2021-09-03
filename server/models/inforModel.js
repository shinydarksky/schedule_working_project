import mongoose from 'mongoose'

const inforScheama = mongoose.Schema({
    fullname:{ type:String, default: ''},
    gender:{ type: Boolean, default: false },
    birthday:{ type:Date, default: Date.now}
})

export default  mongoose.model('informationData',inforScheama)