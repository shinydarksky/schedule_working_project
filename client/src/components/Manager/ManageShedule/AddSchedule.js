import React from 'react'
export default function AddSchedule(props) {
    let list_staff = []

    if (props.userData) {
        list_staff = props.userData.map((user) => {
            return (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td> <input value={user._id} type="checkbox" name="user_select" /></td>
                </tr>
            )
        })
    }

    function onSubmitAddSchedule(e) {
        e.preventDefault()
        const weekName = e.target.weekName.value

        let staffId = []
        for (let check of e.target.user_select) {
            if (check.checked)
                staffId.push(check.value)
        }
        const postData = {
            weekName:weekName,
            staffId:staffId
        }
        props.onAddSChedule(postData)
    }

    let fromAddSchedule = <div id="myModal" className="modal" onClick={props.clickCloseFrom}>
        <div className="modal-content">
            <h4>Thêm lịch làm việc tuần tiếp theo</h4>
            <div>
                <form onSubmit={onSubmitAddSchedule}>
                    <label>
                        Tên tuần làm việc
                        <input type="text" name="weekName" />
                    </label>
                    <button>Thêm</button>
                    <p>Danh sách nhân viên nhận lịch sắp xếp</p>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Tên tài khoản</th>
                                <th>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_staff}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>

    return (
        <div>
            {props.showFromAddSchedule ? fromAddSchedule : ''}
        </div>
    )
}
