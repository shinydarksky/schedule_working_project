const INIT_STATE = {
    isLogin:false,
    user:null
}

const authReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case 'SET-LOGIN': {
            return {
                ...state,
                isAuthor:true,
                user:action.user
            }
        }
        case 'SET-LOGOUT': {
            return {
                ...state,
                isAuthor:false,
                user:null
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer