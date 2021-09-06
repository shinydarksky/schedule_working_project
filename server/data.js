import mongoose from 'mongoose'
import scheduleModel from './models/scheduleModel.js';
import partTimeModel from './models/partTimeModel.js';
import weekModel from './models/weekModel.js';
import staffScheduleModel from './models/staffScheduleModel.js'
import partTimeMarkModel from './models/partTimeMarkModel.js';
import inforModel from './models/inforModel.js';
import loginModel from './models/loginModel.js'
const URI = 'mongodb://localhost:27017/coffeeShopC'

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => {
        console.log("Connect database is success! ");
    }).
    catch((err) => {
        console.log('Errors' + err)
    }
)

function createWeekSchedule(name) {
    try {
        let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        let schedule = new scheduleModel()
        for (let weekData of list_week) {
            let part_time = new partTimeModel()
            schedule[weekData] = part_time
            part_time.save()
        }
        schedule.save()
        let week = weekModel({ weekname: name, weekschedule: schedule })
        week.save()
        createWeekMarkStaff(week._id)
    } catch (error) {
        return JSON.stringify(error)
    }
}

function createStaffSchedule(weekId, staffId) {
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffSchedule = new staffScheduleModel()

    staffSchedule['weekid'] = weekId
    staffSchedule['staffid'] = staffId

    for (let weekData of list_week) {
        let time_mark = partTimeMarkModel()
        staffSchedule[weekData] = time_mark
        time_mark.save()
    }
    staffSchedule.save()
}


function createWeekMarkStaff(weekId) {
    getUser().then((data) => {
        for (let userIndex in data) {
            if (!data[userIndex].isadmin) {
                createStaffSchedule(weekId, data[userIndex]._id)
            }
        }
    })
}


async function getWeek() {
    let week = await weekModel.find().sort({ weekname: 'desc' })
    let results = []
    week.map((data) => {
        results.push({ weekName: data.weekname, weekschedule: data.weekschedule })
    })
    return results
}

function compare(a, b) {
    if (a.weekname < b.weekname) {
        return -1;
    }
    if (a.weekname > b.weekname) {
        return 1;
    }
    return 0;
}

async function getWeekStaff(staffId) {
    let staffweek = await staffScheduleModel.find({ staffid: staffId })
    let weekId = []
    staffweek.map(async (data) => {
        weekId.push(data.weekid)
    })
    let results = []
    for (let id of weekId) {
        let week = await weekModel.findById(id)
        results.push({ weekname: week.weekname, weekid: id })
    }
    return results.sort(compare).reverse()
}


async function getPartime(partId) {
    let partTime = await partTimeModel.findOne({ _id: partId })
    return partTime
}

function setPartTime(partId, partTime, userId) {
    try {
        getPartime(partId).then(async (data) => {
            const check = data[partTime].indexOf(userId)
            if (data[partTime].length < 2 && check) {
                let temp = {}
                temp[partTime] = userId
                let query = { $push: temp }
                await partTimeModel.updateOne({ _id: partId }, query)
            }
        })
    } catch (err) {
        return JSON.stringify(err)
    }
}


async function setPartTimeMark(weekId, staffId, dayId, partId, status) {
    try {
        let staffschedule = await staffScheduleModel.findOne({ weekid: weekId, staffid: staffId })
        let temp = {}
        temp[partId] = status
        partTimeMarkModel.updateOne({ _id: staffschedule[dayId] }, { $set: temp }, function (err) {
            if (err) {
                console.log(err)
            }
        })
    } catch (error) {
        return JSON.stringify(error)
    }
}

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


async function getSchedule(weekId) {
    // let schedule_morning = {}
    // let schedule_afternoon = {}
    // let schedule_night = {}
    let results = {}
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let schedule = await scheduleModel.findOne({ _id: weekId }).sort({ weekname: 'asc' })
    for (let weekData of list_week) {
        await getPartime(schedule[weekData]).then((data) => {
            results[weekData] = data
            // schedule_morning[weekData] = data.morning
            // schedule_afternoon[weekData] = data.afternoon
            // schedule_night[weekData] = data.night
        })
    }
    // return { morning: schedule_morning, afternoon: schedule_afternoon, night: schedule_night }
    return results
}



async function getStaffSchedule(weekId, staffId) {
    // let staff_morning = {}
    // let staff_afternoon = {}
    // let staff_night = {}
    let results = {}
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffschedule = await staffScheduleModel.findOne({ weekid: weekId, staffid: staffId })

    for (let weekData of list_week) {
        let data = await partTimeMarkModel.findOne({ _id: staffschedule[weekData] })
        results[weekData] = data
        // staff_morning[weekData] = data.morning
        // staff_afternoon[weekData] = data.afternoon
        // staff_night[weekData] = data.night

    }
    results.weekid = staffschedule.weekid
    // return { morning: staff_morning, afternoon: staff_afternoon, night: staff_night }
    return results

}


function createUser(username, password, isadmin) {
    const infor = inforModel()
    infor.save()
    loginModel({ username, password, isadmin, informodel: infor }).save()
}


async function getOneWeek() {
    const week = await getWeek()
    const weekId = week[0].weekschedule
    return await getSchedule(weekId)
}

async function getOneWeekStaff(staffId) {
    const week = await weekModel.find().sort({ weekname: 'desc' })
    const weekId = week[0]._id
    return await getStaffSchedule(weekId, staffId)
}

async function getOneUser(username, password) {
    return await loginModel.findOne({ username: username, password })
}

async function getUser() {
    let list_user = await loginModel.find()
    return list_user
}

export { getOneUser }

export { createWeekSchedule }

export { getSchedule }

export { getWeek }

export { getStaffSchedule }

export { getOneWeek }

export { getOneWeekStaff }

export { setPartTimeMarkById }

export { getWeekStaff }

export { getUser }

export { createUser }

async function deleteWeekWeekById(weekId) {
    try {
        let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        let week = await weekModel.findById(weekId)
        let weekschedule = await scheduleModel.findById(week.weekschedule)
        for (let day of list_week) {
            await partTimeModel.findByIdAndDelete(weekschedule[day])
        }
        let staffschedule = await staffScheduleModel.find({ weekid: weekId })
        for (let staff of staffschedule) {
            for (let day of list_week) {
                await partTimeMarkModel.findByIdAndDelete(staff[day])
            }
            await staffScheduleModel.findByIdAndDelete(staff._id)
        }

        await weekModel.findByIdAndDelete(weekId)
        await scheduleModel.findByIdAndDelete(weekschedule._id)
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}



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



async function scheduleGeedy(weekId) {
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let staffSchedule = await staffScheduleModel.find({ weekid: weekId })
    for (let staff_scheduleId in staffSchedule) {
        let userPlan = await getUserPlan(staffSchedule[staff_scheduleId])
        console.log(userPlan)
    }
}


// scheduleGeedy('61262b668aa6ff361cb13ea3')

// createWeekSchedule('Tuần 2')

// deleteWeekScheduleById('612619ef691de5416c7ff09d')
// createUser('admin','admin',true)
// for(let i=5;i<=15;i++)
//     createUser('user'+i,'user'+i,false)

// createWeekMarkStaff('61248a0e497fbd1f2cc29058')

// setPartTimeMark('6123b4a2874cd51e98e6fb1c','6123b49af19c5b25e0de0a67','monday','morning',false)

// getOneWeekStaff('6123b49af19c5b25e0de0a67').then((data)=>{console.log(data)})

// setPartTime('61349e018f93da4228a2d4dc','morning','loc')

// async function test(){
//     loginModel.findByIdAndUpdate('61262b5e03d7433e941e33e3',{username:'user5',password:'te123'})
// }

// test()

