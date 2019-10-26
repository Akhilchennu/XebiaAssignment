const initialState = {
    loginSession: false,userName:''
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "AUTHENTICATE":
            return {
                ...state,
                loginSession: action.login,
                userName:action.userName
            }
        default:
            return state
    }
}
