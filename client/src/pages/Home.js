import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Schedule from '../components/Schedule'
import Manager from '../components/Manager'
import Staff from '../components/Staff'
import { useState, useEffect,useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import './style.css'
import { AuthContext } from '../contexts/auth.js'

export default function Home() {
    const {stateUser:isAuthor} = useContext(AuthContext)
    console.log(isAuthor);
    const [showLoginFrom, setShowLoginFrom] = useState(false)
    const [isLogin, setisLogin] = useState(false)
    const [loginUser, setLoginUser] = useState()

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userlogin'))
        if (userId) {
            onclickLoginType(userId)
        }
    }, [])
    function onclickLoginType(type) {
        try {
            setLoginUser(type)
            setisLogin(true)
        } catch (error) {
            setisLogin(false)
        }
    }


    function onclickLogout() {
        setisLogin(false)
        setLoginUser({})
        localStorage.removeItem('userlogin')
    }

    function homePath() {
        return (!isLogin) ? <Schedule /> : <Redirect to="/user" />
    }

   function userPath() {                                                                                                 
        try {
            if (isLogin && loginUser.isadmin)
                return <Manager />
            if (isLogin && !loginUser.isadmin)
                return <Staff loginUser={loginUser} />
        } catch (e) {
            return <Redirect to="/" />
        }
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
                    <Route path="/user" render={userPath} />
                    <Route path="/" render={homePath} />
                </Switch>
            </Router>
            <Footer />
            {showLoginFrom &&
                <LoginForm
                    onClickloginHide={() => setShowLoginFrom(!showLoginFrom)}
                    onclickLoginType={onclickLoginType}
                />
            }
        </div>
    )
}
