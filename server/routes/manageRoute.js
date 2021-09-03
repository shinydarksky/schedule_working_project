import express from 'express'
import {
    manageStaffControler,
    manageStaffAddUserController,
    manageStaffEditUserController,
    manageStaffDeleteUserController,
    manageScheduleController,
    manageScheduleChangeController,
    manageScheduleStaffController,
    manageScheduleAddController,
    manageScheduleDeleteController,
    manageScheduleGreedyController
}
    from '../controllers/manageController.js'
const router = express.Router()

router.get('/staff', manageStaffControler)

router.post('/staff/adduser', manageStaffAddUserController)

router.post('/staff/edituser', manageStaffEditUserController)

router.post('/staff/deleteuser', manageStaffDeleteUserController)



router.get('/schedule', manageScheduleController)

router.post('/schedule/change', manageScheduleChangeController)

router.get('/schedule/staff', manageScheduleStaffController)

router.post('/schedule/add', manageScheduleAddController)

router.post('/schedule/delete', manageScheduleDeleteController)

router.post('/schedule/greedy', manageScheduleGreedyController)

export default router