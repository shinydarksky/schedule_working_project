import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { apiUrl } from "./constrant";
export const StaffContext = createContext()

const StaffContextProvider = ({ children }) => {
    const [listUser, setlistUser] = useState()

    const loadUser = async ()=>{
        await axios.get(`${apiUrl}/manage/staff`)
            .then((data) => {
                setlistUser(data.data.results)
        })
    }

    useEffect(() => loadUser(), [])

    const onAddUser = async (addUserData) =>{
        await axios.post(`${apiUrl}/manage/staff/adduser`, addUserData)
        .then((data) => {
             setlistUser(data.data.results)
        })
    }

    const EditUser = async (userUpdate) => {
       await axios.post(`${apiUrl}/manage/staff/edituser`, userUpdate)
            .then((data) => {
                setlistUser(data.data.results)
            })
            .catch((err)=>{
                alert(err)
            })
    }

    const deleteUser = (userId) => {
        axios.post(`${apiUrl}/manage/staff/deleteuser`, { userId: userId })
            .then((data) => {
                setlistUser(data.data.results)
        })
    }

    const StaffContentData = {
        onAddUser,
        EditUser,
        deleteUser,
        listUser
    }
    return (
        <StaffContext.Provider value={StaffContentData}>
            {children}
        </StaffContext.Provider>
    )
}

export default StaffContextProvider