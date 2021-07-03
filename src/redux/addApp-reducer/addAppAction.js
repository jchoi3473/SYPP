import AddAppTypes from './addAppTypes'
import axios from 'axios';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';


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




export function postNewApp(app) {
    const uID = JSON.parse(localStorage.getItem('user')).uID
    // fetch('http://teamdevelopmentserver.azurewebsites.net/applications/create', {
    const userInfo = {
        detail:{
            uID: uID,
            companyName: app.applicationDetail.companyName,
            positionName: app.applicationDetail.positionName,
            isFavorite: app.applicationDetail.pinned,
            status: [
                {
                    midTaskID: null,
                    time: app.dates[0].date,
                    title: "Applied",
                    status: app.dates[0].completed,
                    isFavorite : false,
                    showDate: app.dates[0].showDate
                }
            ],
        },       
    }
    var responseResult = {}
    return async dispatch => {
        dispatch({type: 'POST_NEWAPP_PENDING'});
        function onSuccess(success) {
          dispatch({ type: 'POST_NEWAPP_SUCCESS'});
          return responseResult;
        }
        function onError(error) {
          dispatch({ type: 'POST_NEWAPP_FAILED', error });
          return error;
        }
        try {
          const success = await axios.post("https://saveyourappdevelopment.azurewebsites.net/applications/"+uID+"/Create", userInfo)
          .then(response => response.data).then(response => {
                responseResult = response
                console.log(response)
                console.log(responseResult)
            });
          return onSuccess(success);
        } catch (error) {
          return onError(error);
        }
      }








    // const response = await axios.post(
    // "https://saveyourappdevelopment.azurewebsites.net/applications/"+uID+"/Create",
    // userInfo
    // )
    // .then(response => response.data).then(response => {
    //     responseResult = response
    //     console.log(response)
    //     console.log(responseResult)
    // })
    // .then(() => dispatch({
    //         type: 'POST_NEWAPP_SUCCESS',
    //     })
    // ).then(() => {
    //     return responseResult
    // })
    // .catch(error => dispatch({
    //     type: 'POST_NEWAPP_FAILED',
    //     payload: error
    // }))
    // return responseResult
}
