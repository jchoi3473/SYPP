
const INITIAL_STATE = {
        //key1: interview, key2: date key3: etc...
    applications:[],
    selectedTitle: 'All',
    selectedButtonValue: '0',
}


export const filteredProgressReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'REQUEST_PROGRESS_SUCCESS':
        case 'UPDATE_FILTERED_PROGRESS':
            return {
                ...state,
                applications: action.payload,
            }
        case 'UPDATE_FILTERED_PROGRESS_TITLE':
            return {
                ...state,
                selectedTitle : action.payload
            }
        case 'UPDATE_FILTERED_PROGRESS_BUTTON_VALUE':
            return {
                ...state,
                selectedButtonValue : action.payload
            }
            
        default:
            return state;
    } 
}
export default filteredProgressReducer


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
