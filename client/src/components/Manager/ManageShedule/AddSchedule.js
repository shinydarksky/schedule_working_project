import React from 'react'
export default function AddSchedule(props) {
    let list_staff = []
    if (props.userData) {
        list_staff = props.userData.map((user) => {
            return (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>
                            <input className="box-staff" value={user._id} type="checkbox" name="user_select" />
                    </td>
                </tr>
            )
        })
    }

    function onSubmitAddSchedule(e) {
        e.preventDefault()
        try {
            const weekName = e.target.weekName.value
            let staffId = []
            for (let check of e.target.user_select) {
                if (check.checked)
                    staffId.push(check.value)
            }
            const postData = {
                weekName: weekName,
                staffId: staffId
            }
            props.onAddSChedule(postData)
        } catch (error) {
            alert('Lỗi vui lòng kiểm tra lại danh sách nhân viên')
        }
    }

    return (
        <div id="myModal" className="modal" onClick={props.clickCloseFrom}>
            <div className="modal-content">
                <h4>Thêm lịch làm việc tuần tiếp theo</h4>
                <form onSubmit={onSubmitAddSchedule} >
                    <div className="group-item">
                            Tên tuần:
                            <input type="text" name="weekName" id="weekName" />
                        <button >Thêm</button>
                    </div>
                    <div className="schedule overflow-table">
                        <table border="1" id="table-user" className="schedule-table-user">
                            <thead>
                                <tr>
                                    <th colSpan="2" id="text-table"><p>Danh sách nhân viên nhận lịch sắp xếp</p></th>
                                </tr>
                                <tr>
                                    <th>Tên tài khoản</th>
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list_staff}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}
