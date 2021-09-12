import React, { useState} from 'react'
import UserTable from './UserTable'
import AddUser from './UserTable/AddUser'
import EditUser from './UserTable/EditUser'
import { useContext } from 'react'
import { StaffContext } from '../../../contexts/staff'
export default function ManageUser() {
    const {listUser,onAddUser} = useContext(StaffContext)
    const [isAddUser, setIsAddUser] = useState(false)
    const [showFromEdit, setShowFromEdit] = useState(false)
    const [editUser, setEditUser] = useState()

    function onCLickCloseAddUser(userData) {
        if(userData){
            onAddUser(userData)
        }
        setIsAddUser(false)
    }

    function onClickEditUser(userEdit) {
        setEditUser(userEdit)
        setShowFromEdit(true)
    }

    return (
        <div>
            <div id="btn-add-user">
                <button onClick={() => setIsAddUser(true)}>
                    Thêm tài khoản
                </button>
            </div>
            {showFromEdit &&
                <EditUser
                    userData={editUser}
                    onClickCancel={() => setShowFromEdit(false)}
                />
            }
            <div className="manage-user">
                <UserTable
                    loginUser={listUser}
                    onClickUser={onClickEditUser}
                />
            </div>
            {isAddUser &&
                < AddUser
                    onCLickCloseAddUser={onCLickCloseAddUser}
                />
            }
        </div>
    )
}
