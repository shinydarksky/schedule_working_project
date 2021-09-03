import partTimeModel from '../../models/partTimeModel.js';

async function getPartime(partId) {
    let partTime = await partTimeModel.findOne({ _id: partId })
    return partTime
}

export default getPartime
