import weekModel from '../../models/weekModel.js';
import scheduleModel from '../../models/scheduleModel.js';
import partTimeModel from '../../models/partTimeModel.js';
import staffScheduleModel from '../../models/staffScheduleModel.js'
import partTimeMarkModel from '../../models/partTimeMarkModel.js'
async function deleteWeekWeekById(weekId) {
    try {
        const list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        let week = await weekModel.findById(weekId)
        let weekschedule = await scheduleModel.findById(week.weekschedule)
        for (let day of list_week) {
            await partTimeModel.findByIdAndDelete(weekschedule[day])
        }
        let staffschedule = await staffScheduleModel.find({ weekid: weekId })
        for (let staff of staffschedule) {
            for (let day of list_week) {
                await partTimeMarkModel.findByIdAndDelete(staff[day])
            }
            await staffScheduleModel.findByIdAndDelete(staff._id)
        }

        await weekModel.findByIdAndDelete(weekId)
        await scheduleModel.findByIdAndDelete(weekschedule._id)
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export default deleteWeekWeekById