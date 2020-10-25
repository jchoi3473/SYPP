import categoriesTypes from './categoriesTypes'

const INITIAL_STATE = {
    categories : [
        {
        index: 0,
        name: 'Role',
        suggestions : [],
        accordion: false,
        },
        {
        index: 1,
        name: 'Location',
        suggestions : [],
        accordion: false,
        }
    ]
}


const categoriesReducer  = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CATEGORIES':
            return{
                ...state,
                categories: action.payload
            };
        default:
            return state;
    } 
}

export default categoriesReducer;