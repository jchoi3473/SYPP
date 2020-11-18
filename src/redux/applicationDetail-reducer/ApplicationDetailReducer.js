
const INITIAL_STATE = {
    application:{}
}


export const ApplicationDetailReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'UPDATE_APPLICATION_DETAIL':
            return {
                application: action.payload,
            }
        default:
            return state;
    } 
}
export default ApplicationDetailReducer


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
