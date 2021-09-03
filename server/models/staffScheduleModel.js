import mongoose from 'mongoose'

const staffScheduleSchema = mongoose.Schema({
    weekid:{type:mongoose.Schema.Types.ObjectId},
    staffid:{type:mongoose.Schema.Types.ObjectId},
    monday:{type:mongoose.Schema.Types.ObjectId},
    twesday:{type:mongoose.Schema.Types.ObjectId},
    wednesday:{type:mongoose.Schema.Types.ObjectId},
    thursday:{type:mongoose.Schema.Types.ObjectId},
    friday:{type:mongoose.Schema.Types.ObjectId},
    saturday:{type:mongoose.Schema.Types.ObjectId},
    sunday:{type:mongoose.Schema.Types.ObjectId}
})

export default  mongoose.model('staffSchedule',staffScheduleSchema)