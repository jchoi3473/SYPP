const INITIAL_STATE = {
        //key1: interview, key2: date key3: etc...
    isPending: false, 
    connection: null,
    error:''
}

export const connectionReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'REQUEST_CONNECTION_PENDING':
            return {
                ...state, 
                isPending: true
            }
        case 'REQUEST_CONNECTION_SUCCESS':
            return {
                user: action.payload,
                isPending: false   
            }
        case 'REQUEST_CONNECTION_FAILED':
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
export default connectionReducer

