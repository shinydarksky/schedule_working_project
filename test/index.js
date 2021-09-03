import React, { useState, useEffect } from 'react'
import './style.css'
import ManageUser from './ManageUser'
import ManageShedule from './ManageShedule'
export default function Manager() {
    const [typeManager,setTypeManager] = useState(0)
    useEffect(() => {
        setTypeManager(0)
    },[setTypeManager])

    return (
        <div className="manager">
            <div className="manager-control">
                <button onClick={()=>setTypeManager(0)}>Quản lý tài khoản</button>
                <button onClick={()=>setTypeManager(1)}>Quản lý sắp xếp lịch</button>
            </div>
            <div>
            {typeManager===0 ? <ManageUser/> : ''}
            {typeManager===1 ? <ManageShedule/> : ''}
            </div>
        </div>
    )
}
