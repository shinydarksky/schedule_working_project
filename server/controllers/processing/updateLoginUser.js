import loginModel from '../../models/loginModel.js'


const updateLoginUser = async (userUpdate) => {
    try {
        const userId = userUpdate._id
        const { fullname, username, password, salary, isAdmin } = userUpdate
        await loginModel.findByIdAndUpdate(userId,
            {
                fullname: fullname,
                username: username,
                password: password,
                salary: salary,
                isadmin: isAdmin
            })
        const list_user = await loginModel.find()
        return list_user
    } catch (error) {
        return error
    }
}

export default updateLoginUser