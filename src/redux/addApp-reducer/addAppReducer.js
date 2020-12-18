import addAppTypes from './addAppTypes'

const INITIAL_STATE = {
    applicationDetail:{
        companyName: '',
        positionName: '',
        pinned: false,
        },
        Categories : [
            {
            Type: 'Role',
            SuggestionsOrSeleceted : [],
            },
            {
            Type: 'Location',
            SuggestionsOrSeleceted : [],
            }
        ],
        archived: false, 
        dates :[
            {key : 0, 
            date: new Date(), 
            showDate: true, 
            completed: true}
        ],
}

const addAppReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_COMPANY_NAME':
            return {
                ...state,
                applicationDetail:{
                    companyName: action.payload,
                    positionName: state.applicationDetail.positionName,
                    pinned: state.applicationDetail.pinned,
                }
        };
        case 'SET_POSITION_NAME':
            return{
                ...state,
                applicationDetail:{
                    companyName: state.applicationDetail.companyName,
                    positionName: action.payload,
                    pinned: state.applicationDetail.pinned,
                }
            };
        case 'SET_SELECTED_CATEGORIES':
            return{
                ...state,
                Categories: action.payload
            };
        case 'SET_DATES':
            return{
                ...state,
                dates: action.payload
            };
        case 'SET_INTERVIEW_DATE':
            return{
                ...state,
                interviewDate: action.payload
            };

        case 'POST_NEWAPP_PENDING':
            return Object.assign({}, state, {isPending: true})

        case 'POST_NEWAPP_SUCCESS':
            return {
                ...state,
                applicationDetail:{
                    companyName: '',
                    positionName: '',
                    pinned: false,
                },
                archived: false, 
                dates :[
                    {key : 0, 
                    date: new Date(), 
                    showDate: true, 
                    completed: true}
                ],
            }
        case 'POST_NEWAPP_FAILED':
            return Object.assign({}, state, {error: action.payload, isPending: false})
        default:
            return state;
    } 
}

export default addAppReducer;