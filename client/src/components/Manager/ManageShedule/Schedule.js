import React from 'react'

export default function Schedule({ schedule }) {

    function removeUndefine(s) {
        if (s) return s
        return ''
    }
    function get_name(data, timeId) {
        return removeUndefine(data[timeId][0]) +' '+ removeUndefine(data[timeId][1])
    }
    let idx = 0
    let staff_morning = [<td key='0'>Buổi sáng</td>]
    let staff_afternoon = [<td key='0'>Buổi chiều</td>]
    let staff_night = [<td key='0'>Buổi tối</td>]
    let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    for (let day of list_week) {
        if (schedule) {
            idx++
            staff_morning.push(<td key={idx}>{get_name(schedule[day], 'morning')}</td>)
            staff_afternoon.push(<td key={idx}>{get_name(schedule[day], 'afternoon')}</td>)
            staff_night.push(<td key={idx}>{get_name(schedule[day], 'night')}</td>)
        }
    }

    return (
        <div className="schedule">
            <table border="1">
                <thead id="table-head">
                    <tr>
                        <th>Ca</th>
                        <th>Thứ 2</th>
                        <th>Thứ 3</th>
                        <th>Thứ 4</th>
                        <th>Thứ 5</th>
                        <th>Thứ 6</th>
                        <th>Thứ 7</th>
                        <th>CN</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr>
                        {staff_morning}
                    </tr>
                    <tr>
                        {staff_afternoon}
                    </tr>
                    <tr>
                        {staff_night}
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
