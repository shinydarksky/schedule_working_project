import React from 'react'
import Header from '../components/Header'
import Schedule from '../components/Schedule'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Staff from '../components/Staff'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './style.css'
import Manager from '../components/Manager'
export default function Home() {
    const [showLoginFrom, setShowLoginFrom] = useState(false)
    const [typeLogin, settypeLogin] = useState(0)
    const [loginUser, setLoginUser] = useState({})
    const [isLogin, setisLogin] = useState(false)

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('userlogin'))
        sessionStorage.removeItem('userlogin')
        if (userId) {
            axios.get('http://localhost:5000/login/userrefresh?userid=' + userId)
                .then((data) => {
                    onclickLoginType(data.data.results)
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }, [])

    function onclickLoginType(type) {
        try {
            setLoginUser(type)
            if (type.isadmin)
                settypeLogin(1)
            else if (!type.isadmin)
                settypeLogin(2)
            setisLogin(true)
            sessionStorage.setItem('userlogin', JSON.stringify(type._id))
        } catch (error) {
            settypeLogin(0)
            setisLogin(false)
        }
    }

    function onclickLogout() {
        settypeLogin(0)
        setisLogin(false)
        sessionStorage.removeItem('userlogin')
    }

    return (
        <div id="main">
            <Header
                onclickLogin={() => setShowLoginFrom(!showLoginFrom)}
                onclickLogout={onclickLogout}
                isLogin={isLogin}
            />
            {typeLogin === 0 ? <Schedule /> : ''}
            {typeLogin === 1 ? <Manager loginUser={loginUser} /> : ''}
            {typeLogin === 2 ? <Staff loginUser={loginUser} /> : ''}
            <Footer />
            <LoginForm
                showLoginFrom={showLoginFrom}
                onClickloginHide={() => setShowLoginFrom(!showLoginFrom)}
                onclickLoginType={onclickLoginType}
            />
        </div>
    )
}
