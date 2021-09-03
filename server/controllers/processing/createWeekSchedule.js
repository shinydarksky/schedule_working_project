import weekModel from "../../models/weekModel.js"
import scheduleModel from "../../models/scheduleModel.js"
import partTimeModel from "../../models/partTimeModel.js"
import createWeekMarkStaff from './createWeekMarkStaff.js'
function createWeekSchedule(name) {
    try {
        let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        let schedule = new scheduleModel()
        for (let weekData of list_week) {
            let part_time = new partTimeModel()
            schedule[weekData] = part_time
            part_time.save()
        }
        schedule.save()
        let week = weekModel({ weekname: name, weekschedule: schedule })
        week.save()
        createWeekMarkStaff(week._id)
    } catch (error) {
        return JSON.stringify(error)
    }
}

export default createWeekSchedule