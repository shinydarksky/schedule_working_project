import React, { useState } from 'react'
import ManageUser from './ManageUser'
import ManageShedule from './ManageShedule'
import './style.css'
import StaffContextProvider from '../../contexts/staff'
export default function Manager() {

    const styles = {
        active: {
            backgroundColor: 'dodgerblue',
            color: 'white'
        },
        deactive: {
            backgroundColor: 'white',
            color: 'dodgerblue'
        }
    }
    const [typeManager, setTypeManager] = useState(false)
    const [styleButton, setStyleButton] = useState({
        user: styles.active,
        schedule: styles.deactive
    })


    function onCLickButtonManage(type) {
        if (type === 'user') {
            setTypeManager(false)
            setStyleButton({
                user: styles.active,
                schedule: styles.deactive
            })
        }
        else if (type === 'schedule') {
            setTypeManager(true)
            setStyleButton({
                user: styles.deactive,
                schedule: styles.active
            })
        }
    }

    return (
        <div>
            <div className="manager">
                <div className="manager-control">
                    <button onClick={() => onCLickButtonManage('user')} style={styleButton.user}>Quản lý tài khoản</button>
                    <button onClick={() => onCLickButtonManage('schedule')} style={styleButton.schedule}>Quản lý và sắp xếp lịch làm việc</button>
                </div>
                <div>
                    <StaffContextProvider>
                        {!typeManager && <ManageUser />}
                        {typeManager && <ManageShedule />}
                    </StaffContextProvider>
                </div>
            </div>
        </div>
    )
}
