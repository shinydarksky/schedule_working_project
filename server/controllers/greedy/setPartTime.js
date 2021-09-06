import getPartime from '../processing/getPartime.js'
import partTimeModel from '../../models/partTimeModel.js'
async function setPartTime(partId, partTime, userId) {
    try {
        return await getPartime(partId).then(async (data) => {
            const check = data[partTime].indexOf(userId)
            if (data[partTime].length < 2 && check) {
                let temp = {}
                temp[partTime] = userId
                let query = { $push: temp }
                await partTimeModel.updateOne({ _id: partId }, query)
                return true
            } 
            else 
                return false
        })

    } catch (err) {
        return false
    }
}


export default setPartTime