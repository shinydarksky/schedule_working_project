import loginModel from '../../models/loginModel.js'

async function getStaff(){
    const list_staff = await loginModel.find({isadmin:false})
    return list_staff
}

export default getStaff