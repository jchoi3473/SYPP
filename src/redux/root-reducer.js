import { combineReducers} from 'redux';

import addAppReducer from './addApp-reducer/addAppReducer'
import categoriesReducer from './categories-reducer/categoriesReducer'
import progressReducer from './progress-reducer/progressReducer'
import filteredProgressReducer from './filteredProgress-reducer/filteredProgressReducer'
import applicationDetailReducer from './applicationDetail-reducer/ApplicationDetailReducer'
import companyReducer from './company-reducer/companyReducer'
import userReducer from './user-reducer/userReducer'
import connectionReducer from './connection-reducer/connectionReducer'
export default combineReducers({
    addApp : addAppReducer,
    categories: categoriesReducer,
    progress : progressReducer,
    filteredProgress: filteredProgressReducer,
    applicationDetail: applicationDetailReducer,
    companies: companyReducer,
    user : userReducer,
    connection : connectionReducer
    // requestProgress : requestProgressReducer
})