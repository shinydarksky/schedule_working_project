import staffScheduleModel from '../../models/staffScheduleModel.js'
import loginModel from '../../models/loginModel.js'
import getUserPlan from './getUserPlan.js'
import setPartTime from './setPartTime.js'
import refreshScheduleById from '../processing/refreshScheduleById.js'

function compare(a, b) {
    if (a.staffMark < b.staffMark) {
        return -1;
    }
    if (a.staffMark > b.staffMark) {
        return 1;
    }
    return 0;
}

async function scheduleGeedy(weekId) {
    let list_mark = []
    let staffSchedule = await staffScheduleModel.find({ weekid: weekId })
    // let num_shift = []
    let num_shift = {}
    for (let staff_scheduleId in staffSchedule) {
        let userPlan = await getUserPlan(staffSchedule[staff_scheduleId])
        let staff = await loginModel.findById(staffSchedule[staff_scheduleId].staffid)
        let staffData = {}
        // num_shift.push({
        //     staffName: staff.fullname,
        //     num: 0
        // })
        num_shift[staff.fullname] = 0

        if (userPlan.length > 0) {
            staffData.staffName = staff.fullname
            staffData.salary = staff.salary
            staffData.staffMark = userPlan
            list_mark.push(staffData)
        }
    }
    const schedule = await refreshScheduleById(weekId)
    list_mark.sort(compare)

    //greedy 1 

    // const flag_max = list_mark[0].staffMark.length+1
    // for (let staff of list_mark) {
    //     let flag_num = 0
    //     while(staff.staffMark.length > 0 && flag_num<flag_max){
    //         let mark = staff.staffMark.pop()
    //         let isArrange = await setPartTime(schedule[mark.dayId],mark.timeId,staff.staffName)
    //         if(isArrange){
    //             num_shift[staff.staffName]++
    //             flag_num++
    //         }
    //     }
    // }

    // greedy 2


    // const flag_max = {
    //     num: 1,
    //     is_max: false
    // }



    let flag_max = {
        num_max: 21,
        is_max: false
    }

    for (let i = 0; i < 42; i++) {
        for (let staff of list_mark) {
           
            while (staff.staffMark.length > 0 && num_shift[staff.staffName] < flag_max.num_max+1) {
                let mark = staff.staffMark.pop()
                let isArrange = await setPartTime(schedule[mark.dayId], mark.timeId, staff.staffName)
                console.log(schedule[mark.dayId], mark.timeId, staff.staffName)
                if(isArrange){
                    num_shift[staff.staffName]++
                    break
                }
            }
            if (staff.staffMark.length == 0 && !flag_max.is_max) {
                flag_max.num_max = num_shift[staff.staffName]
                flag_max.is_max = true
            }
        }
    }
    console.log(flag_max.num_max)
    console.log(num_shift)
}

export default scheduleGeedy