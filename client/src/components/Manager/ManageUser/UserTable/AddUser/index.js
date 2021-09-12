import React, { useState } from 'react'
import './style.css'
export default function AddUser({ onCLickCloseAddUser}) {
    const [isAdmin, setIsAdmin] = useState(false)
    
    function onClickAddUser(e) {
        e.preventDefault()
        const addUserData = {
            username: e.target.username.value,
            password: e.target.password.value,
            isadmin: e.target.isadmin.value
        }
        onCLickCloseAddUser(addUserData)
    }

    function onClickClose(e){
        if (e.target.id === 'myModal') {
            onCLickCloseAddUser()
        }
    }

    function onClickIsAdmin(e) {
        setIsAdmin(e.target.checked)
    }

    return (
        <div id="myModal" className="modal" onClick={onClickClose}>
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
                            <label className="group-checkbox">
                                Cấp quyền quản lý
                                <input type="checkbox" id="isadmin" name="isadmin" value={isAdmin} onChange={onClickIsAdmin} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="login-add">
                            <button >Thêm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
