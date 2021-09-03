import React from 'react'

export default function ChangeWeek({week,onChangeWeek,userLogin}) {
    let week_select = []

    
    if(week){
        for(let idx in week){
            week_select.push(<option key={idx} value={week[idx].weekid} >{week[idx].weekname}</option>)
        }
    }

    function onChangeSelect(e){
        onChangeWeek(e.target.value)
    }

    return (
        <div id="select-week">
            <select onChange={onChangeSelect} >
                {week_select}
            </select>
            <div id="user-login">
                <p>Tài khoản:<b> {userLogin}</b></p>
            </div>
        </div>
    )
}
