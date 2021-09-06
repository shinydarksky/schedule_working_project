import weekModel from '../../models/weekModel.js'
import partTimeModel from '../../models/partTimeModel.js'
import scheduleModel from '../../models/scheduleModel.js'
async function deleteScheduleById(weekId) {
    const list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const weekData = await weekModel.findById(weekId)
    let schedule = await scheduleModel.findById(weekData.weekschedule)
    const empty = {
        morning: [],
        afternoon: [],
        night: []
    }
    for (let day of list_week) {
        let partime = await partTimeModel.updateOne({_id:schedule[day]},{$set:empty})
    }
    return schedule
}

export default deleteScheduleById