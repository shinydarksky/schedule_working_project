import React from 'react'

export default function UserTable({ loginUser, onClickUser }) {
    let list_user = []
    let idx = 0

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
        <div className="schedule">
            <table id="table-user">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    {list_user}
                </tbody>
            </table>
        </div>
    )
}
