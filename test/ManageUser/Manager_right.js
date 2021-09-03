import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Manager_right() {
    const [week, setWeek] = useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/week')
            .then((data) => {
                setWeek(data.data.results)
            })
    }, [])
    try {
        var weekData = week.map((data)=>{
            return <option key={data.weekschedule} value={data.weekschedule}>{data.weekname}</option>
        })
    } catch (error) {
        
    }

    return (
        <>
            <button>Thêm tài khoản</button>
            <button>Sắp xếp lịch</button>
            <div>
                <select>
                    {weekData}
                </select>
            </div>
        </>
    )
}