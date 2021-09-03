import weekModel from '../../models/weekModel.js';

async function getWeek() {
    let week = await weekModel.find().sort({ weekname: 'desc' })
    let results = []
    week.map((data) => {
        results.push({ _id:data._id,weekName: data.weekname, weekschedule: data.weekschedule })
    })
    return results
}

export default getWeek