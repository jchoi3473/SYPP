
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

