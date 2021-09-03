import loginModel from '../../models/loginModel.js'
function createUser(username, password, isadmin) {
    loginModel({ username, password, isadmin}).save()
}

export default createUser