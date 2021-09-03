import React from 'react'
import axios from 'axios'
import './style.css'
export default function LoginForm({ showLoginFrom, onClickloginHide, onclickLoginType }) {
    
    const closeForm = (e) => {
        if (e.target.id === 'myModal')
            onClickloginHide()
    }

    const onSubmitLoginForm = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        axios.post('http://localhost:5000/login', { username: username, password: password })
            .then((data) => {
                if (data.data.login) {
                    const userId = JSON.stringify(data.data.login)
                    localStorage.setItem('userlogin',userId)
                    onclickLoginType(data.data.login)
                }
            })
        onClickloginHide()
    }


    let loginForm =
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
    return (
        <>
            {showLoginFrom ? loginForm : ''}
        </>
    )
}
