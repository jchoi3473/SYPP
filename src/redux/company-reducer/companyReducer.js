
const INITIAL_STATE = {
        //key1: interview, key2: date key3: etc...
    companies:[],
    isPending: false, 
    error:''
}


export const progressReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_COMPANY':
            return{
                ...state,
                companies: action.payload
            };
        case 'REQUEST_COMPANY_PENDING':
            return {
                ...state, 
                isPending: true
            }
        case 'REQUEST_COMPANY_SUCCESS':
            return {
                companies: action.payload,
                isPending: false   
            }
        case 'REQUEST_COMPANY_FAILED':
            return Object.assign({}, state, {error: action.payload, isPending: false})
        
        case 'POST_COMPANY_PENDING':
            return Object.assign({}, state, {isPending: true})

        case 'POST_COMPANY_SUCCESS':
            return {
                ...state,
                isPending: false   
            }
        case 'POST_COMPANY_FAILED':
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
