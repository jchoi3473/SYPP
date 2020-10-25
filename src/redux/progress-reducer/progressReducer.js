
const INITIAL_STATE = {
        //key1: interview, key2: date key3: etc...
    applications:[],
    isPending: false, 
    error:''
}


export const progressReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_APPS':
            return{
                ...state,
                applications: action.payload
            };
        case 'REQUEST_PROGRESS_PENDING':
            return {
                ...state, 
                isPending: true
            }
        case 'REQUEST_PROGRESS_SUCCESS':
            return {
                applications: action.payload,
                isPending: false   
            }
        case 'REQUEST_PROGRESS_FAILED':
            return Object.assign({}, state, {error: action.payload, isPending: false})
        
        case 'POST_PROGRESS_PENDING':
            return Object.assign({}, state, {isPending: true})

        case 'POST_PROGRESS_SUCCESS':
            return {
                ...state,
                isPending: false   
            }
        case 'POST_PROGRESS_FAILED':
            return Object.assign({}, state, {error: action.payload, isPending: false})

        
        default:
            return state;
    } 
}
export default progressReducer


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
