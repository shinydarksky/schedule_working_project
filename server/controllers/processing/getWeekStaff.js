import staffScheduleModel from '../../models/staffScheduleModel.js'
import weekModel from '../../models/weekModel.js';

function compare(a, b) {
    if (a.weekname < b.weekname) {
        return -1;
    }
    if (a.weekname > b.weekname) {
        return 1;
    }
    return 0;
}

async function getWeekStaff(staffId) {
    let staffweek = await staffScheduleModel.find({ staffid: staffId })
    let weekId = []
    staffweek.map(async (data) => {
        weekId.push(data.weekid)
    })
    let results = []
    for (let id of weekId) {
        let week = await weekModel.findById(id)
        results.push({ weekname: week.weekname, weekid: id })
    }
    return results.sort(compare).reverse()
}

export default getWeekStaff