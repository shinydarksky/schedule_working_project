import mongoose from 'mongoose'


const partTimeMarkSchema = new  mongoose.Schema({
    morning:{ type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    night: { type: Boolean, default: false }
})

export default mongoose.model('partTimeMark',partTimeMarkSchema)