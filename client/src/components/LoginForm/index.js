import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './style.css'
export default function LoginForm({ onClickloginHide }) {
    const { onLogin } = useContext(AuthContext)
    const closeForm = (e) => {
        if (e.target.id === 'myModal')
            onClickloginHide()
    }

    const onSubmitLoginForm = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        onLogin({username,password})
        onClickloginHide()
    }

    return (
        <div id="myModal" className="modal" onClick={closeForm}>
            <div className="modal-content">
                <form id="formLogin" onSubmit={onSubmitLoginForm}>
                    <div className="form-layout">
                        <div className="title">
                            <h4>Đăng nhập tài khoản</h4>
                        </div>
                        <div className="form-item">
                            <label>
                                Tài khoản
                                <input type="text" id="username" name="username" />
                            </label>
                        </div>
                        <div className="form-item">
                            <label>
                                Mật khẩu
                                <input type="password" id="password" name="password" />
                            </label>
                        </div>
                        <div className="loginBtn">
                            <button >Đăng nhập</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
