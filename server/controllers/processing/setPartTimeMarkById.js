import partTimeMarkModel from '../../models/partTimeMarkModel.js';

async function setPartTimeMarkById(partTimeId, timeId, status) {
    try {
        let temp = {}
        temp[timeId] = status
        partTimeMarkModel.updateOne({ _id: partTimeId }, { $set: temp }, function (err) {
            if (err) {
                console.log(err)
            }
        })
    } catch (error) {
        return JSON.stringify(error)
    }
}

export default setPartTimeMarkById