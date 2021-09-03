import staffScheduleModel from '../../models/staffScheduleModel.js'
import getUserPlan from './getUserPlan.js'
async function scheduleGeedy(weekId) {
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffSchedule = await staffScheduleModel.find({ weekid: weekId })
    for (let staff_scheduleId in staffSchedule) {
        let userPlan = await getUserPlan(staffSchedule[staff_scheduleId])
        console.log(userPlan)
    }
}

export default scheduleGeedy