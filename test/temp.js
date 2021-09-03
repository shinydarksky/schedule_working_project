import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import ListUser from './User/ListUser'
import User from './User/User'
import ManagerRight from './Manager_right'
export default function Manager() {
    const [loginUser, setLoginUser] = useState()
    const [userData,setUserData] = useState()
    const [leftBox,setLeftBox] = useState(0)
    let list_user = []
    let idx = 0
    useEffect(() => {
        axios.get('http://localhost:5000/test')
            .then((data) => {
                setLoginUser(data.data.results)
            })

    }, [setLoginUser])

    function onClickUser(Data){
        setLeftBox(1)
        setUserData(Data)
    }

    for (let userData in loginUser) {
        idx++
        list_user.push(
            <tr key={idx} onClick={()=>onClickUser(loginUser[userData])}>
                <td>{idx}</td>
                <td>{loginUser[userData].username}</td>
                <td>{loginUser[userData].password}</td>
                <td>{loginUser[userData].isadmin ? 'X' : ''}</td>
            </tr>)
    }

    function onClickCancel(){
        setLeftBox(0)
    }

    return (
        <div className="manager">
            <div className="manager_left" >
                {leftBox ===0 ? <ListUser list_user={list_user} /> : ''}
                {leftBox ===1 ? <User userData={userData} onClickCancel={onClickCancel}/>: ''}
            </div>
            <div className="manager_right" >
                <ManagerRight  />
            </div>
        </div>
    )
}




import React , { useEffect, useState } from 'react'
import axios from 'axios'
import StaffLeft from './Staff_left'
import StaffRight from './Staff_right'
import './style.css'
export default function Staff() {
    const  [staffSchedule,setStaffSchedule] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:5000/staff')
            .then((data) => {
                setStaffSchedule(data.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    function changeSchedule(day,shift,value){
        console.log(day);
        console.log(shift);
        console.log(value);
    }

    let staff_morning = [<td key='0'>Buổi sáng</td>]
    let idx = 0
    for (let day in staffSchedule) {
        idx++
        staff_morning.push(<td key={idx} onClick={()=>changeSchedule(day,'monring',staffSchedule[day].morning)}>{staffSchedule[day].morning ? 'X' : ''}</td>)
    }
    let staff_afternoon = [<td key={idx}>Buổi chiều</td>]
    for (let day in staffSchedule) {
        idx++
        staff_afternoon.push(<td key={idx} onClick={()=>changeSchedule(day,'afternoon',staffSchedule[day].afternoon)}>{staffSchedule[day].afternoon ? 'X' : ''}</td>)
    }
    let staff_night = [<td key={idx}>Buổi tối</td>]
    for (let day in staffSchedule) {
        idx++
        staff_night.push(<td key={idx} onClick={()=>changeSchedule(day,'night',staffSchedule[day].night)}>{staffSchedule[day].night ? 'X' : ''}</td>)
    }

    
    return (
        <div className="staff">
            <div className="staff-left">
                <StaffLeft staff_morning={staff_morning} staff_afternoon={staff_afternoon} staff_night={staff_night} />
            </div>
            <div className="staff-right">
                <StaffRight />
            </div>
        </div>
    )
}
