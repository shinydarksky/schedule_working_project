import scheduleModel from '../../models/scheduleModel.js';
import getPartime from './getPartime.js'

async function getSchedule(weekId) {
    let results = {}
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let schedule = await scheduleModel.findOne({ _id: weekId })
    for (let weekData of list_week) {
        await getPartime(schedule[weekData]).then((data) => {
            results[weekData] = data
        })
    }
    return results
}

export default getSchedule