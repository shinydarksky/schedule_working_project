[1mdiff --git a/client/src/components/Manager/ManageUser/UserTable/EditUser/index.js b/client/src/components/Manager/ManageUser/UserTable/EditUser/index.js[m
[1mindex 71e14e1..bda1e21 100644[m
[1m--- a/client/src/components/Manager/ManageUser/UserTable/EditUser/index.js[m
[1m+++ b/client/src/components/Manager/ManageUser/UserTable/EditUser/index.js[m
[36m@@ -31,8 +31,10 @@[m [mexport default function EditUser({ userData, onClickCancel, onEditUser, deleteUs[m
     function onSubmitEdit(e) {[m
         e.preventDefault()[m
         const userUpdateData = {[m
[32m+[m[32m            fullname: userUpdate.fullname,[m
             username: userUpdate.username,[m
             password: userUpdate.password,[m
[32m+[m[32m            salary:userUpdate.salary,[m
             isAdmin: isAdmin,[m
             _id: userData._id[m
         }[m
[1mdiff --git a/server/controllers/greedy/getUserPlan.js b/server/controllers/greedy/getUserPlan.js[m
[1mindex 69c022b..76afc59 100644[m
[1m--- a/server/controllers/greedy/getUserPlan.js[m
[1m+++ b/server/controllers/greedy/getUserPlan.js[m
[36m@@ -11,7 +11,6 @@[m [masync function getUserPlan(weekStaff) {[m
                     dayId: dayId,[m
                     partId:staff_mark._id,[m
                     timeId: timeId,[m
[31m-                    staffid: weekStaff.staffid[m
                 })[m
             }[m
         }[m
[1mdiff --git a/server/controllers/greedy/scheduleGeedy.js b/server/controllers/greedy/scheduleGeedy.js[m
[1mindex ddc63f4..b71693b 100644[m
[1m--- a/server/controllers/greedy/scheduleGeedy.js[m
[1m+++ b/server/controllers/greedy/scheduleGeedy.js[m
[36m@@ -1,12 +1,28 @@[m
 import staffScheduleModel from '../../models/staffScheduleModel.js'[m
[32m+[m[32mimport loginModel from '../../models/loginModel.js'[m
 import getUserPlan from './getUserPlan.js'[m
[32m+[m[32mimport setPartTime from '../processing/setPartTime.js'[m
[32m+[m[32mimport refreshScheduleById from '../processing/refreshScheduleById.js'[m
 async function scheduleGeedy(weekId) {[m
[31m-    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][m
[32m+[m[32m    let list_mark = [][m
     let staffSchedule = await staffScheduleModel.find({ weekid: weekId })[m
     for (let staff_scheduleId in staffSchedule) {[m
         let userPlan = await getUserPlan(staffSchedule[staff_scheduleId])[m
[31m-        console.log(userPlan)[m
[32m+[m[32m        let staff = await loginModel.findById(staffSchedule[staff_scheduleId].staffid)[m
[32m+[m[32m        let staffData = {}[m
[32m+[m[32m        staffData.staffName=staff.fullname[m
[32m+[m[32m        staffData.staffMark=userPlan[m
[32m+[m[32m        list_mark.push(staffData)[m
     }[m
[32m+[m
[32m+[m[32m    const schedule = await refreshScheduleById(weekId)[m
[32m+[m[32m    // for(let staff of list_mark){[m
[32m+[m[32m    //     console.log(staff)[m
[32m+[m[32m    // }[m
[32m+[m[32m    console.log('------------------------------------------------------------------')[m
[32m+[m[32m    // fo r(let staff of list_mark){[m
[32m+[m[32m    //     console.log(staff)[m
[32m+[m[32m    // }[m
 }[m
 [m
 export default scheduleGeedy[m
\ No newline at end of file[m
[1mdiff --git a/server/controllers/processing/deleteWeekWeekById.js b/server/controllers/processing/deleteWeekWeekById.js[m
[1mindex 09a70bf..b32ebca 100644[m
[1m--- a/server/controllers/processing/deleteWeekWeekById.js[m
[1m+++ b/server/controllers/processing/deleteWeekWeekById.js[m
[36m@@ -5,7 +5,7 @@[m [mimport staffScheduleModel from '../../models/staffScheduleModel.js'[m
 import partTimeMarkModel from '../../models/partTimeMarkModel.js'[m
 async function deleteWeekWeekById(weekId) {[m
     try {[m
[31m-        let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][m
[32m+[m[32m        const list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][m
         let week = await weekModel.findById(weekId)[m
         let weekschedule = await scheduleModel.findById(week.weekschedule)[m
         for (let day of list_week) {[m
[1mdiff --git a/server/controllers/processing/updateLoginUser.js b/server/controllers/processing/updateLoginUser.js[m
[1mindex ee3029d..8a89b22 100644[m
[1m--- a/server/controllers/processing/updateLoginUser.js[m
[1m+++ b/server/controllers/processing/updateLoginUser.js[m
[36m@@ -4,8 +4,15 @@[m [mimport loginModel from '../../models/loginModel.js'[m
 const updateLoginUser = async (userUpdate) => {[m
     try {[m
         const userId = userUpdate._id[m
[31m-        const { username, password, isAdmin } = userUpdate[m
[31m-        await loginModel.findByIdAndUpdate(userId, { username: username, password: password, isadmin: isAdmin })[m
[32m+[m[32m        const { fullname, username, password, salary, isAdmin } = userUpdate[m
[32m+[m[32m        await loginModel.findByIdAndUpdate(userId,[m
[32m+[m[32m            {[m
[32m+[m[32m                fullname: fullname,[m
[32m+[m[32m                username: username,[m
[32m+[m[32m                password: password,[m
[32m+[m[32m                salary: salary,[m
[32m+[m[32m                isadmin: isAdmin[m
[32m+[m[32m            })[m
         const list_user = await loginModel.find()[m
         return list_user[m
     } catch (error) {[m
