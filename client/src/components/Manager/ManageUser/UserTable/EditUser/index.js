import React, { useState, useEffect } from 'react'
import './style.css'
export default function EditUser({ userData, onClickCancel, onEditUser, showFromEdit, deleteUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (userData) {
            setUsername(userData.username)
            setPassword(userData.password)
            setIsAdmin(userData.isadmin)
        }
    }, [setUsername, setPassword, userData])

    function onChangeUsername(e) {
        setUsername(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onSubmitEdit(e) {
        e.preventDefault()
        const userUpdate = {
            username: username,
            password: password,
            isAdmin: isAdmin,
            _id: userData._id
        }
        onEditUser(userUpdate)
    }

    function onClickIsAdmin(e) {
        setIsAdmin(e.target.checked)
    }

    function onClickDelete(e){
        e.preventDefault()
        deleteUser(userData)
    }

    let editFrom = <div className="edit-user">
        <p className="title">Sửa thông tin đăng nhập</p>
        <form onSubmit={onSubmitEdit}>
            <div className="edit-item">
                <label >
                    Tên tài khoản
                    <input type="text" name="username" value={username} onChange={(onChangeUsername)} />
                </label>
            </div>
            <div className="edit-item">
                <label>
                    Mật khẩu
                    <input type="text" name="text" value={password} onChange={(onChangePassword)} />
                </label>
            </div>
            <div className="btn-checkbox">
                <label className="group-checkbox">Quyền admin
                    <input type="checkbox" checked={isAdmin} onChange={onClickIsAdmin} />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div id="group-btn"> 
                <button className="btn-edit">Chỉnh sửa</button>
                <button className="btn-edit" onClick={onClickDelete}>Xóa</button>
                <button className="btn-edit" onClick={onClickCancel}>Hủy</button>
            </div>
            <div >Thông tin chi tiết...</div>
        </form>
    </div>

    return (
        <>
            {showFromEdit ? editFrom : ""}
        </>
    )
}
