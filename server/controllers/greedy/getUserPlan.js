import partTimeMarkModel from '../../models/partTimeMarkModel.js'
async function getUserPlan(weekStaff) {
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let time = ['morning', 'afternoon', 'night']
    let results = []
    for (let dayId of list_week) {
        let staff_mark = await partTimeMarkModel.findById(weekStaff[dayId])
        for (let timeId of time) {
            if (staff_mark[timeId]) {
                results.push({
                    dayId: dayId,
                    partId:staff_mark._id,
                    timeId: timeId,
                    staffid: weekStaff.staffid
                })
            }
        }
    }
    return results.sort()
}

export default getUserPlan