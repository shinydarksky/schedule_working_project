import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
export default function AddUser({ onCLickCloseAddUser, afterAddUser, isAddUser }) {
    const [isAdmin, setIsAdmin] = useState(false)

    function onClickAddUser(e) {
        e.preventDefault()
        const addUserData = {
            username: e.target.username.value,
            password: e.target.password.value,
            isadmin: e.target.isadmin.value
        }
        axios.post('http://localhost:5000/manage/staff/adduser', addUserData)
            .then((data) => {
                afterAddUser(data.data.results)
            })
    }
    function onClickIsAdmin(e) {
        setIsAdmin(e.target.checked)
    }

    let formAddUser = <div id="myModal" className="modal" onClick={onCLickCloseAddUser}>
        <div className="modal-content" >
            <form onSubmit={onClickAddUser}>
                <div className="form-layout">
                    <div className="title">
                        <h4>Thêm tài khoản</h4>
                    </div>
                    <div className="form-item">
                        <label>
                            <p>Tài khoản</p>
                            <input type="text" id="username" name="username" />
                        </label>
                    </div>
                    <div className="form-item">
                        <label>
                            <p>Mật khẩu</p>
                            <input type="password" id="password" name="password" />
                        </label>
                    </div>
                    <div className="btn-is-admin">
                        <label>
                            Cấp quyền quản lý
                            <input type="checkbox" id="isadmin" name="isadmin" value={isAdmin} onChange={onClickIsAdmin} />
                        </label>
                    </div>
                    <div className="login-add">
                        <button >Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    return (
        <div>
            {isAddUser ? formAddUser : ''}
        </div>
    )
}
