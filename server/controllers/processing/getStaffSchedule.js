import staffScheduleModel from '../../models/staffScheduleModel.js'
import partTimeMarkModel from '../../models/partTimeMarkModel.js';

async function getStaffSchedule(weekId, staffId) {
    let results = {}
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffschedule = await staffScheduleModel.findOne({ weekid: weekId, staffid: staffId })

    for (let weekData of list_week) {
        let data = await partTimeMarkModel.findOne({ _id: staffschedule[weekData] })
        results[weekData] = data
    }
    results.weekid = staffschedule.weekid
    return results

}

export default getStaffSchedule