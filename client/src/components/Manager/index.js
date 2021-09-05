import React, { useState } from 'react'
import ManageUser from './ManageUser'
import ManageShedule from './ManageShedule'
import './style.css'
export default function Manager() {
    const [typeManager, setTypeManager] = useState(false)

    return (
        <div>
            <div className="manager">
                <div className="manager-control">
                    <button onClick={() => setTypeManager(false)}>Quản lý tài khoản</button>
                    <button onClick={() => setTypeManager(true)}>Quản lý và sắp xếp lịch làm việc</button>
                </div>
                <div>
                    {!typeManager && <ManageUser />}
                    {typeManager && <ManageShedule />}
                </div>
            </div>
        </div>
    )
}
