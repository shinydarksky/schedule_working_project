import loginModel from '../../models/loginModel.js'
async function getUser() {
    let list_user = await loginModel.find()
    return list_user
}

export default getUser