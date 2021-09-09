const initialState = {
    username:'',
    password:'',
    isLogin:false
}
const loginReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'SET-LOGIN-USER':{
            console.log('SET-LOGIN-USER');
            return true
        }
        case "GET-LOGIN-USER":{
            console.log('GET-LOGIN-USER');
            return true
        }
        default:{
            console.log(123)
            return false
        }
    }
}
export default loginReducer