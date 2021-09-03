import React, { useState, useEffect } from 'react'

export default function User({userData,onClickCancel}) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)

    useEffect(() => {
        setUsername(userData.username)
        setPassword(userData.password)
        setIsAdmin(userData.isadmin)
    }, [setUsername,setPassword,userData])

    function onChangeUsername(e){
        setUsername(e.target.value)
    }
    function onChangePassword(e){
        setPassword(e.target.value)
    }
    function onSubmitEdit(e){
        e.preventDefault()
    }

    function onClickIsAdmin(e){
        setIsAdmin(e.target.checked)
    }
    return (
        <div className="edit-user">
            <div className="title">
                <h4>Sửa thông tin đăng nhập</h4>
            </div>
            <form onSubmit={onSubmitEdit}>
                <label>
                    Tên tài khoản
                <input type="text" name="username" value={username} onChange={(onChangeUsername)}/>
                </label>
                <label>
                    Mật khẩu
                <input type="text" name="password" value={password} onChange={(onChangePassword)}/>
                </label>
                <label>Quyền admin
                <input type="checkbox" checked={isAdmin} onChange={onClickIsAdmin}/>
                </label>
                <button>Chỉnh sửa</button>
                <button onClick={onClickCancel}>Hủy</button>
            </form>
        </div>
    )
}
