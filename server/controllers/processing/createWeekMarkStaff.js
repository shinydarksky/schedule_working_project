import getUser from './getUser.js'
import createStaffSchedule from './createStaffSchedule.js'
function createWeekMarkStaff(weekId) {
    getUser().then((data) => {
        for (let userIndex in data) {
            if (!data[userIndex].isadmin) {
                createStaffSchedule(weekId, data[userIndex]._id)
            }
        }
    })
}

export default createWeekMarkStaff