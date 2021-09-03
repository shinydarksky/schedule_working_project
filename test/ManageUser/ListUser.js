import React from 'react'

export default function ListUser({list_user}) {
    return (
        <>
             <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list_user}
                    </tbody>
                </table>
        </>
    )
}
