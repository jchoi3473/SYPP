import AddAppTypes from './addAppTypes'


//

export const setCompanyName = companyName => ({
    type: 'SET_COMPANY_NAME',
    payload: companyName
});

export const setPositionName = positionName => ({
    type: 'SET_POSITION_NAME',
    payload: positionName
});  

export const setSelectedCategories = (categories) => ({
    type: 'SET_SELECTED_CATEGORIES',
    payload: categories
});  

export const setDates = (dates) => ({
    type: 'SET_DATES',
    payload: dates
});  

export const setInterviewDate = (interviewDate) => ({
    type: 'SET_INTERVIEW_DATE',
    payload: interviewDate
});  




export const postNewApp = (app) => (dispatch) =>{
    dispatch({type: 'POST_NEWAPP_PENDING'});
    // fetch('http://teamdevelopmentserver.azurewebsites.net/applications/create', {
    fetch('http://localhost:3000/newapp', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // applicationDetail: app.applicationDetail,
        _id: null,
        applicationID: null,
        uID: null,
        authID: null,
        Tasks:[
        {
            midTaskID: null,
            Time: app.dates[0].date,
            Title: "Applied",
            Status: app.dates[0].completed,
            showDate: app.dates[0].showDate
        }
        ],
        Detail:{
            applicationID: null,
            uID: null,
            CompanyName: app.applicationDetail.companyName,
            PositionName: app.applicationDetail.positionName,
            IsFavorite: app.applicationDetail.pinned,
            companyID: null,
            positionID: null,
            Status: null,
            Categories: app.Categories
        },       
      })
    })
    .then(response => console.log(response.json()))
    .then(() => dispatch({
            type: 'POST_NEWAPP_SUCCESS',
        })
    )
    .catch(error => dispatch({
        type: 'POST_NEWAPP_FAILED',
        payload: error
    }))
}
