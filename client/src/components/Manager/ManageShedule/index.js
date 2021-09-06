import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import Schedule from './Schedule'
import AddSchedule from './AddSchedule'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export default function ManageShedule() {
    const [schedule, setSchedule] = useState()
    const [week, setWeek] = useState()
    const [showFromAddSchedule, setShowFromAddSchedule] = useState(false)
    const [userData, setUserData] = useState()
    const [scheduleId, setScheduleId] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/manage/schedule')
            .then((data) => {
                setSchedule(data.data.results)
                setWeek(data.data.week)
                setScheduleId(data.data.week[0].weekschedule)
            })
            .catch((err) => {
                alert(err)
            })
    }, [setSchedule])

    let week_select = []

    if (week) {
        let num = 0
        week.map((e) => {
            num++
            return week_select.push(<option key={num} value={e.weekschedule}>{e.weekName}</option>)
        })
    }

    function onChangeWeek(e) {
        const Id = e.target.value
        setScheduleId(Id)
        axios.post('http://localhost:5000/manage/schedule/change', { scheduleId: Id })
            .then((data) => {
                setSchedule(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    function clickCloseFrom(e) {
        if (e.target.id === 'myModal')
            setShowFromAddSchedule(false)
    }

    function onClickAddSchedule() {
        setShowFromAddSchedule(true)
        axios.get('http://localhost:5000/manage/schedule/staff')
            .then((data) => {
                setUserData(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    function onAddSChedule(dataSchedule) {
        axios.post('http://localhost:5000/manage/schedule/add', dataSchedule)
            .then((data) => {
                setSchedule(data.data.results)
                setWeek(data.data.week)
                setScheduleId(data.data.week[0].weekschedule)
            })
            .catch((err) => {
                alert(err)
            })
        setShowFromAddSchedule(false)
    }

    function onDelete() {
        confirmAlert({
            title: 'Xác nhận xóa lịch',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => {
                        axios.post('http://localhost:5000/manage/schedule/delete', { scheduleId: scheduleId })
                            .then((data) => {
                                setSchedule(data.data.results)
                                setWeek(data.data.week)
                                setScheduleId(data.data.week[0].weekschedule)
                            })
                            .catch((err) => {
                                alert(err)
                            })
                    }
                },
                {
                    label: 'Hủy'
                }
            ]
        });
    }

    function onCickScheduleSort() {
        axios.post('http://localhost:5000/manage/schedule/greedy', { scheduleId: scheduleId })
            .then((data) => {
                setSchedule(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <div>
            <div id="group-tool">
                <select onChange={onChangeWeek}>
                    {week_select}
                </select>
                <button onClick={onClickAddSchedule}>
                    Thêm lịch
                </button>
                <button onClick={onCickScheduleSort}>
                    Sắp xếp lịch
                </button>
                <button onClick={onDelete}>
                    Xóa lịch
                </button>
            </div>

            <div className="schedule-manage">
                <div className="schedule-table">
                    <Schedule schedule={schedule} />
                </div>
                <div className="schedule-staff">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nhân viên</th>
                                <th>Số ca</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123ádassdaádaádddddddddddddddddddsđásdasds</td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td>123ádassdaádaádddddddddddddddddddsđásdasds</td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td>123ádassdaádaádddddddddddddddddddsđásdasds</td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td>123ádassdaádaádddddddddddddddddddsđásdasds</td>
                                <td>123</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {showFromAddSchedule &&
                <AddSchedule
                    clickCloseFrom={clickCloseFrom}
                    userData={userData}
                    onAddSChedule={onAddSChedule}
                />
            }
        </div>
    )
}
