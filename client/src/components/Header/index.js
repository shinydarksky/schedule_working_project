import React from 'react'
import { logoText } from '../../contexts/constrant'
import './style.css'
export default function Header({ onclickLogin, onclickLogout, isLogin }) {


    return (
        <div id="header">
            <div className="header-logo">
                <p>{logoText}</p>
            </div>
            <div className="header-content">
                <ul className="menu">
                    {
                    isLogin ?
                        <li onClick={(e) => { onclickLogout() }}><div className="btn-login"><b>Đăng xuất</b></div></li> 
                    :
                        <li onClick={(e) => { onclickLogin() }}><div className="btn-login">Đăng nhập</div></li>
                    }

                </ul>
            </div>
        </div>
    )
}
