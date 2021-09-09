const getLoginUser = (user) => {
    return{
        type:'GET-LOGIN-USER',
        payload:user
    }
}

const setLoginUser = (user) => {
    return{
        type:'SET-LOGIN-USER',
        payload:user
    }
}