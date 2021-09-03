import inforModel from "../../models/inforModel.js"
import loginModel from '../../models/loginModel.js'

const deleteLoginUser = async (userData) => {
    try {
        await loginModel.findByIdAndDelete(userData._id)
        await inforModel.findByIdAndDelete(userData.informodel)
        const list_user = await loginModel.find()
        return list_user
    } catch (error) {
        return error
    }
}

export default deleteLoginUser