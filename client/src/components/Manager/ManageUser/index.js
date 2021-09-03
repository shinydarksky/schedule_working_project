import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import UserTable from './UserTable'
import AddUser from './UserTable/AddUser'
import EditUser from './UserTable/EditUser'
export default function ManageUser() {
    const [loginUser, setLoginUser] = useState()
    const [isAddUser, setIsAddUser] = useState(false)
    const [showFromEdit, setShowFromEdit] = useState(false)
    const [editUser, setEditUser] = useState()
    
    useEffect(() => {
        axios.get('http://localhost:5000/manage/staff')
            .then((data) => {
                setLoginUser(data.data.results)
            })
    }, [setLoginUser])

    function onCLickCloseAddUser(e) {
        if (e.target.id === 'myModal') {
            setIsAddUser(false)
        }
    }

    function afterAddUser(listUser) {
        setLoginUser(listUser)
        setIsAddUser(false)
    }

    function onClickEditUser(userEdit) {
        setEditUser(userEdit)
        setShowFromEdit(true)
    }

    function onEditUser(userUpdate) {
        axios.post('http://localhost:5000/manage/staff/edituser', userUpdate)
            .then((data) => {
                setLoginUser(data.data.results)
            })
        setShowFromEdit(false)
    }

    function deleteUser(userId){
        axios.post('http://localhost:5000/manage/staff/deleteuser',{userId:userId})
        .then((data) => {
            setLoginUser(data.data.results)
        })
        setShowFromEdit(false)
    }

    return (
        <div>
            <div id="btn-add-user">
                <button onClick={() => setIsAddUser(true)}>
                    Thêm tài khoản
                </button>
            </div>
            <EditUser
                userData={editUser}
                onClickCancel={() => setShowFromEdit(false)}
                onEditUser={onEditUser}
                showFromEdit={showFromEdit}
                deleteUser={deleteUser}
            />
            <div className="manage-user">
                <UserTable
                    loginUser={loginUser}
                    onClickUser={onClickEditUser}
                />
                <AddUser
                    onCLickCloseAddUser={onCLickCloseAddUser}
                    afterAddUser={afterAddUser}
                    isAddUser={isAddUser}
                />
            </div>
        </div>
    )
}
