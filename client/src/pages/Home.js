import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Schedule from '../components/Schedule'
import Manager from '../components/Manager'
import Staff from '../components/Staff'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import './style.css'
import { AuthContext } from '../contexts/auth.js'

export default function Home() {
    const {stateUser:{isAuthor,user},onLogout} = useContext(AuthContext)
    const [showLoginFrom, setShowLoginFrom] = useState(false)

    function homePath() {
        return (!isAuthor) ? <Schedule /> : <Redirect to="/user" />
    }

   function userPath() {                                                                                                 
        try {
            if (isAuthor && user.isadmin)
                return <Manager />
            if (isAuthor && !user.isadmin)
                return <Staff loginUser={user} />
        } catch (e) {
            return <Redirect to="/" />
        }
        return <Redirect to="/" />
    }

    return (
        <div id="main">
            <Header
                onclickLogin={() => setShowLoginFrom(!showLoginFrom)}
                onclickLogout={onLogout}
                isLogin={isAuthor}
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
                />
            }
        </div>
    )
}
