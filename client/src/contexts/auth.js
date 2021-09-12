import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import axios from 'axios'
import { apiUrl } from "./constrant";
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [stateUser, dispatch] = useReducer(authReducer, { isAuthor: false, user: null })

    const loadUser = () => {
        const userLogin = sessionStorage.getItem('userlogin')
        if (userLogin) {
            const user = JSON.parse(userLogin)
            dispatch({ type: 'SET-LOGIN' ,user})
        }
        else {
            sessionStorage.removeItem('userlogin')
        }
    }

    const onLogin = async ({ username, password }) => {
        await axios.post(`${apiUrl}/login`, { username: username, password: password })
        .then((data) => {
            if (data.data.results) {
                const userId = JSON.stringify(data.data.results)
                sessionStorage.setItem('userlogin', userId)
                
            }
        })
        await loadUser()
    }

    const onLogout = () =>{
        dispatch({type:'SET-LOGOUT'})
        sessionStorage.removeItem('userlogin')
    }

    useEffect(() => {
        return loadUser()
    }, [])

    const AuthContentData = {
        stateUser,
        onLogin,
        onLogout
    }
    return (
        <AuthContext.Provider value={AuthContentData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider