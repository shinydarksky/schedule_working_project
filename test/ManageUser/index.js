import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListUser from './ListUser'

export default function ManageUser() {
    const [loginUser, setLoginUser] = useState()
    const [userData,setUserData] = useState()
    let list_user = []
    let idx = 0
    useEffect(() => {
        axios.get('http://localhost:5000/test')
            .then((data) => {
                setLoginUser(data.data.results)
            })
    }, [setLoginUser])

    function onClickUser(Data){
        setUserData(Data)
        console.log(userData);
    }

    for (let userData in loginUser) {
        idx++
        list_user.push(
            <tr key={idx} onClick={() => onClickUser(loginUser[userData])}>
                <td>{idx}</td>
                <td>{loginUser[userData].username}</td>
                <td>{loginUser[userData].password}</td>
                <td>{loginUser[userData].isadmin ? 'X' : ''}</td>
            </tr>)
    }
    return (
        <div>
                <ListUser list_user={list_user} />
        </div>
    )
}
