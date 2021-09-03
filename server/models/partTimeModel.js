import mongoose from 'mongoose'


const partTimeSchema = new  mongoose.Schema({
    morning: { type: Array, default: []},
    afternoon: { type: Array, default: []},
    night: { type: Array, default: []}
})

export default mongoose.model('partTime', partTimeSchema)