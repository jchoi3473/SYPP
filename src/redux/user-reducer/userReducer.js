const INITIAL_STATE = {
        //key1: interview, key2: date key3: etc...
    user:[],
    isPending: false, 
    error:''
}

export const userReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'REQUEST_USER_PENDING':
            return {
                ...state, 
                isPending: true
            }
        case 'REQUEST_USER_SUCCESS':
            return {
                user: action.payload,
                isPending: false   
            }
        case 'REQUEST_USER_FAILED':
            return {
                ...state, 
                isPending: false,
                error : action.payload

                // Object.assign({}, state, {error: action.payload, isPending: false})
            }
        default:
            return state;
    } 
}
export default userReducer


// export const requestProgressReducer = (state = INITIAL_STATE, action) =>{
//     switch(action.type){
//         case 'REQUEST_PROGRESS_PENDING':
//             return Object.assign({}, state, {isPending: true})

//         case 'REQUEST_PROGRESS_SUCCESS':
//             return {
//                 applications: action.payload,
//                 isPending: false   
//             }
//         case 'REQUEST_PROGRESS_SUCCESS':
//             return Object.assign({}, state, {error: action.payload, isPending: false})
//         default:
//             return state;
//     } 
// }
// export default requestProgress
