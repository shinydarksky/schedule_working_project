import staffScheduleModel from "../../models/staffScheduleModel.js"
import partTimeMarkModel from "../../models/partTimeMarkModel.js"

function createStaffSchedule(weekId, staffId) {
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffSchedule = new staffScheduleModel()

    staffSchedule['weekid'] = weekId
    staffSchedule['staffid'] = staffId

    for (let weekData of list_week) {
        let time_mark = partTimeMarkModel()
        staffSchedule[weekData] = time_mark
        time_mark.save()
    }
    staffSchedule.save()
}

export default createStaffSchedule