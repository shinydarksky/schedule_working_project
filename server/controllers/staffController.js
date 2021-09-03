import getOneWeekStaff from './processing/getOneWeekStaff.js'
import getWeekStaff from './processing/getWeekStaff.js'
import getStaffSchedule from './processing/getStaffSchedule.js'
import setPartTimeMarkById from './processing/setPartTimeMarkById.js'
export const staffController =  async (req, res) => {
    const { userid } = req.query
    const week = await getOneWeekStaff(userid)
    const weekstaff = await getWeekStaff(userid)
    res.status(200).json({ results: week, weekstaff: weekstaff })
}

export const staffWeekController =  async (req, res) => {
    const { userid, weekid } = req.body
    const staffschedule = await getStaffSchedule(weekid, userid)
    res.status(200).json({ results: staffschedule })
}

export const staffEditController = async (req, res) => {
    const { weekid, staffid, partTimeId, timeId, status } = req.body
    setPartTimeMarkById(partTimeId, timeId, !status)
    const results = await getStaffSchedule(weekid, staffid)
    res.status(200).json({ results: results })
}