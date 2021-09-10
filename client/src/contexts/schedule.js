import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export const ScheduleContext = createContext()

const ScheduleContextProvier = ({ children }) => {
    const [schedule, setSchedule] = useState({})
    const [week, setWeek] = useState()
    const [scheduleId, setScheduleId] = useState()
    useEffect(() => {
        homeSchedule()
    }, [])

    function removeUndefine(s) {
        if (s) return s
        return ''
    }

    function get_name(data, timeId) {
        return removeUndefine(data[timeId][0]) + removeUndefine(data[timeId][1])
    }

    let idx = 0
    let staff_morning = [<td key='0'>Buổi sáng</td>]
    let staff_afternoon = [<td key='0'>Buổi chiều</td>]
    let staff_night = [<td key='0'>Buổi tối</td>]
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    if (schedule) {
        for (let day of list_week) {
            if (schedule[day]) {
                idx++
                staff_morning.push(<td key={idx}>{get_name(schedule[day], 'morning')}</td>)
                staff_afternoon.push(<td key={idx}>{get_name(schedule[day], 'afternoon')}</td>)
                staff_night.push(<td key={idx}>{get_name(schedule[day], 'night')}</td>)
            }
        }
    }

    // load week 
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
        changeSchedule(Id)
    }

    // on load schedule
    const homeSchedule = async () => {
        await axios.get('http://localhost:5000/manage/schedule')
            .then((data) => {
                setSchedule(data.data.results)
                setWeek(data.data.week)
                setScheduleId(data.data.week[0].weekschedule)
            })
            .catch((err) => {
                alert(err)
            })
    }
    
    // on change schedule
    const changeSchedule = Id => {
        axios.post('http://localhost:5000/manage/schedule/change', { scheduleId: Id })
            .then((data) => {
                setSchedule(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }

    //  on delete schedule
    const onDelete = () => {
        confirmAlert({
            title: 'Xác nhận xóa lịch',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: async () => {
                        await axios.post('http://localhost:5000/manage/schedule/delete', { scheduleId: scheduleId })
                            .then((data) => {
                                setWeek(data.data.week)
                                changeSchedule(data.data.week[0].weekschedule)
                                setScheduleId(data.data.week[0].weekschedule)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                },
                {
                    label: 'Hủy'
                }
            ]
        })
    }

    // on add schedule
    const onAddSChedule = async dataSchedule => {
        await axios.post('http://localhost:5000/manage/schedule/add', dataSchedule)
            .then((data) => {
                setWeek(data.data.week)
                changeSchedule(data.data.week[0].weekschedule)
                setScheduleId(data.data.week[0].weekschedule)
            })
            .catch((err) => {
                alert(err)
            })
    }

    // schedule sorting
    const onCickScheduleSort = async () => {
        await axios.post('http://localhost:5000/manage/schedule/greedy', { scheduleId: scheduleId })
            .then((data) => {
                changeSchedule(scheduleId)
            })
            .catch((err) => {
                alert(err)
            })
    }

    // context data 
    const ScheduleContextData = {
        staff_morning,
        staff_afternoon,
        staff_night,
        week_select,
        onChangeWeek,
        onDelete,
        onAddSChedule,
        onCickScheduleSort
    }

    return (
        <ScheduleContext.Provider value={ScheduleContextData}>
            {children}
        </ScheduleContext.Provider>
    )
}

export default ScheduleContextProvier