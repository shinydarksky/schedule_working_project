import React, { useContext } from 'react'
import { ScheduleContext } from '../../../contexts/schedule'


export default function Schedule() {
    const { staff_morning, staff_afternoon, staff_night} = useContext(ScheduleContext)
    
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
