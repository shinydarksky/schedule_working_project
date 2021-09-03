import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StaffSchedule from './StaffSchedule'
import './style.css'
import ChangeWeek from './ChangeWeek'
export default function Staff({ loginUser }) {
    const [staffWeek, setStaffWeek] = useState()
    const [week, setWeek] = useState()
    useEffect(() => {
        if (loginUser) {
            axios.get('http://localhost:5000/staff?userid=' + loginUser._id)
                .then((data) => {
                    setStaffWeek(data.data.results)
                    setWeek(data.data.weekstaff)
                })
                .catch((err) => {
                    alert(err)
                })
        }

    }, [loginUser, setStaffWeek])

    function onClickChangePlan(partTimeId, timeId, status) {
        const datapost = {
            weekid: staffWeek.weekid,
            staffid: loginUser._id,
            partTimeId: partTimeId,
            timeId: timeId,
            status: status
        }
        axios.post('http://localhost:5000/staff/edit', datapost)
            .then((data) => {
                setStaffWeek(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    function onCheckPlan(data, timeId, idx) {
        const status = data[timeId] ? 'X' : ''
        return <td key={idx} onClick={() => onClickChangePlan(data._id, timeId, data[timeId])}>{status}</td>
    }



    function onChangeWeek(weekId) {
        axios.post('http://localhost:5000/staff/week', { weekid: weekId, userid: loginUser._id })
            .then((data) => {
                setStaffWeek(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <div className="staff">
            <div className="change-week">
                <ChangeWeek
                    week={week}
                    onChangeWeek={onChangeWeek}
                    userLogin={loginUser.username}
                />
            </div>
            <div className="plan_schedule">
                <StaffSchedule
                    staffWeek={staffWeek}
                    onCheckPlan={onCheckPlan}
                />
            </div>
        </div>
    )
}
