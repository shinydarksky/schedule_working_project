import inforModel from "../../models/inforModel.js"
import loginModel from '../../models/loginModel.js'
function createUser(username, password, isadmin) {
    const infor = inforModel()
    infor.save()
    loginModel({ username, password, isadmin, informodel: infor }).save()
}

export default createUser