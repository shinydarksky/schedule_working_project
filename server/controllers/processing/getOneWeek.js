import getWeek from './getWeek.js'
import getSchedule from './getSchedule.js'
async function getOneWeek() {
    const week = await getWeek()
    const weekId = week[0].weekschedule
    const weekName = week[0].weekName
    const scheduleId = week[0]._id
    let schedule = await getSchedule(weekId)
    schedule.weekName = weekName
    schedule._id = scheduleId
    return schedule
}

export default getOneWeek