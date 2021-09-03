import loginModel from '../../models/loginModel.js'


const updateLoginUser = async (userUpdate) => {
    try {
        const userId = userUpdate._id
        const { username, password, isAdmin } = userUpdate
        await loginModel.findByIdAndUpdate(userId, { username: username, password: password, isadmin: isAdmin })
        const list_user = await loginModel.find()
        return list_user
    } catch (error) {
        return error
    }
}

export default updateLoginUser