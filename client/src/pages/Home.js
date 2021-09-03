import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Schedule from '../components/Schedule'
import Manager from '../components/Manager'
import Staff from '../components/Staff'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import './style.css'
export default function Home() {
    const [showLoginFrom, setShowLoginFrom] = useState(false)
    const [isLogin, setisLogin] = useState(false)
    const [loginUser, setLoginUser] = useState()

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
            setisLogin(true)
            sessionStorage.setItem('userlogin', JSON.stringify(type._id))
        } catch (error) {
            setisLogin(false)
        }
    }


    function onclickLogout() {
        setisLogin(false)
        sessionStorage.removeItem('userlogin')
    }


    function homePath() {
        return (!isLogin) ? <Schedule/> : <Redirect to="/user" />
    }

    function userPath(){
        if(isLogin && loginUser.isadmin)
            return <Manager />
        if(isLogin && !loginUser.isadmin)
            return <Staff loginUser={loginUser}/>

        return <Redirect to="/" />
    }

    return (
        <div id="main">
            <Header
                onclickLogin={() => setShowLoginFrom(!showLoginFrom)}
                onclickLogout={onclickLogout}
                isLogin={isLogin}
            />
            <Router>
                <Switch>
                    <Route path="/user" render={userPath}/>
                    <Route path="/" render={homePath} />
                </Switch>
            </Router>
            <Footer />
            <LoginForm
                showLoginFrom={showLoginFrom}
                onClickloginHide={() => setShowLoginFrom(!showLoginFrom)}
                onclickLoginType={onclickLoginType}
            />
        </div>
    )
}
