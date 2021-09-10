import React, { useState, useContext } from 'react'
import './style.css'
import Schedule from './Schedule'
import AddSchedule from './AddSchedule'
import { ScheduleContext } from '../../../contexts/schedule'
export default function ManageShedule() {
    const [userData, setUserData] = useState()
    const [showFromAddSchedule, setShowFromAddSchedule] = useState(false)
    const {
        week_select,
        onChangeWeek,
        onDelete,
        onAddSChedule,
        onCickScheduleSort
    } = useContext(ScheduleContext)

    function clickCloseFrom(e) {
        if (e.target.id === 'myModal')
            setShowFromAddSchedule(false)
    }

    function AddSChedule(dataSchedule) {
        onAddSChedule(dataSchedule)
        setShowFromAddSchedule(false)
    }

    return (
        <div>
            <div id="group-tool">
                <select onChange={e => onChangeWeek(e)}>
                    {week_select}
                </select>
                <button onClick={() => setShowFromAddSchedule(true)}>
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
                    <Schedule />
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
                        </tbody>
                    </table>
                </div>
            </div>
            {showFromAddSchedule &&
                <AddSchedule
                    clickCloseFrom={clickCloseFrom}
                    userData={userData}
                    onAddSChedule={AddSChedule}
                />
            }
        </div>
    )
}
