import weekModel from '../../models/weekModel.js';
import getStaffSchedule from './getStaffSchedule.js'
async function getOneWeekStaff(staffId) {
    const week = await weekModel.find().sort({ weekname: 'desc' })
    const weekId = week[0]._id
    return await getStaffSchedule(weekId, staffId)
}

export default getOneWeekStaff