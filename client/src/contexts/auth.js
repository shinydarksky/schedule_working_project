import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [stateUser, dispatch] = useReducer(authReducer, { isAuthor: false })
    const loadUser = () => {
        const userLogin = localStorage.getItem('userlogin')
        if (userLogin) {
            dispatch({ type: 'SET-LOGIN' })
        }
        else {
        }
    }

    const onLogin = ({ username, password }) => {
        axios.post('http://localhost:5000/login', { username: username, password: password })
            .then((data) => {
                if (data.data.results) {
                    const userId = JSON.stringify(data.data.results)
                    localStorage.setItem('userlogin', userId)
                }
            })
    }


    useEffect(() => {
        return loadUser()
    }, [])

    const AuthContentData = {
        stateUser,
        onLogin
    }
    return (
        <AuthContext.Provider value={AuthContentData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider