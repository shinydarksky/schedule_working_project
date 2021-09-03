import React from 'react'

export default function Staff_left({ staffWeek, onCheckPlan }) {
    let idx = 0
    let staff_morning = [<td key={idx}>Buổi sáng</td>]
    let staff_night = [<td key={idx}>Buổi tối</td>]
    let staff_afternoon = [<td key={idx}>Buổi chiều</td>]

    if (staffWeek) {
        let list_week = ['monday', 'twesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        for (let day of list_week) {
            idx++
            onCheckPlan(staffWeek[day], 'morning')
            staff_morning.push(onCheckPlan(staffWeek[day], 'morning', idx))
            staff_afternoon.push(onCheckPlan(staffWeek[day], 'afternoon', idx))
            staff_night.push(onCheckPlan(staffWeek[day], 'night', idx))
        }
    }

    return (
        <div>
            <div>
                <h4 className="title">Lịch làm yêu cầu</h4>
            </div>
            <div className="schedule">
                <table border="1" id="staff_table">
                    <thead>
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
                    <tbody>
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
        </div>
    )
}
