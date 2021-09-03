import getUser from "./processing/getUser.js"
import createUser from "./processing/createUser.js"
import updateLoginUser from './processing/updateLoginUser.js'
import deleteLoginUser from "./processing/deleteLoginUser.js"
import getOneWeek from './processing/getOneWeek.js'
import getWeek from "./processing/getWeek.js"
import getSchedule from "./processing/getSchedule.js"
import getStaff from "./processing/getStaff.js"
import deleteWeekWeekById from './processing/deleteWeekWeekById.js'
import createWeekSchedule from "./processing/createWeekSchedule.js"
import scheduleGeedy from "./greedy/scheduleGeedy.js"

export const manageStaffControler = async (req, res) => {
    const list_staff_user = await getUser()
    res.status(200).json({ results: list_staff_user })
}

export const manageStaffAddUserController = async (req, res) => {
    try {
        const { username, password, isadmin } = req.body
        createUser(username, password, isadmin)
        const list_staff_user = await getUser()
        res.status(200).json({ results: list_staff_user })
    } catch (error) {
        res.status(500).error(error)
    }
}

export const manageStaffEditUserController = async (req, res) => {
    try {
        const list_user = await updateLoginUser(req.body)
        res.status(200).json({ results: list_user })
    } catch (error) {
        res.status(500).error(error)
    }
}

export const manageStaffDeleteUserController = async (req, res) => {
    try {
        const list_user = await deleteLoginUser(req.body.userId)
        res.status(200).json({ results: list_user })
    } catch (error) {
        res.status(500).error(error)
    }
}

export const manageScheduleController = async (req, res) => {
    try {
        let schedule = await getOneWeek()
        let week = await getWeek()
        res.status(200).json({ results: schedule, week: week })
    } catch (error) {
        return error
    }
}

export const manageScheduleChangeController = async (req, res) => {
    try {
        const {scheduleId} = req.body
        const schedule = await getSchedule(scheduleId)
        res.status(200).json({ results:schedule})
    } catch (error) {
        return error
    }
}

export const manageScheduleStaffController = async (req, res) => {
    try {
        const list_staff = await getStaff()
        res.status(200).json({ results:list_staff})
    } catch (error) {
        return error
    }
}

export const manageScheduleAddController = async (req, res) => {
    try {
        const {weekName} = req.body
        const result = createWeekSchedule(weekName)
        let schedule = await getOneWeek()
        let week = await getWeek()
        res.status(200).json({ results: schedule, week: week })
    } catch (error) {
        return error
    }
}

import weekModel from "../models/weekModel.js"
export const manageScheduleDeleteController = async (req, res) => {
    try {
        const weekdata = await weekModel.findOne({weekschedule:req.body.scheduleId})
        await deleteWeekWeekById(weekdata._id)
        let schedule = await getOneWeek()
        let week = await getWeek()
        res.status(200).json({ results: schedule, week: week })
    } catch (error) {
        return error
    }
}


export const manageScheduleGreedyController = async (req, res) => {
    try {
        const weekData = await weekModel.findOne({weekschedule:req.body.scheduleId})
        // await deleteWeekWeekById(weekdata._id)
        // let schedule = await getOneWeek()
        // let week = await getWeek()
        // res.status(200).json({ results: schedule, week: week })
        await scheduleGeedy(weekData._id)
        res.send('123')
    } catch (error) {
        return error
    }
}