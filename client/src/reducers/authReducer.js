const INIT_STATE = {
    isLogin:false,
    user:null
}

const authReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case 'SET-LOGIN': {
            return {
                ...state,
                isAuthor:true
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer