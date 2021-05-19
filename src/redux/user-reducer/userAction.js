// export const setApps = (apps) => ({
//     type: 'SET_APPS',
//     payload: apps
// });  

// export const requestProgress = () => (dispatch) => {
//     dispatch({type: 'REQUEST_PROGRESS_PENDING'});
//     fetch('http://localhost:3000/')
//     .then(res => res.json())
//     .then(data => dispatch({
//         type: 'REQUEST_PROGRESS_SUCCESS',
//         payload: data
//     }))
//     .catch(error => dispatch({
//         type: 'REQUEST_PROGRESS_FAILED',
//         payload: error
//     }))
// }

// async export function requestProgress(dispatch){
//     dispatch({type: 'REQUEST_PROGRESS_PENDING'});
//     const response = await fetch('http://localhost:3000/')
//     const json = await response.json()
//     const data = await dispatch({
//         type: 'REQUEST_PROGRESS_SUCCESS',
//         payload: json
//     })
// }
// export default requestProgress+


export const postLogin = (email, password) => (dispatch) =>{
    dispatch({type: 'REQUEST_USER_PENDING'});
    fetch('https://saveyourappdevelopment.azurewebsites.net/auth/authenticate', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          Email : email,
          Password : password
        })
      })
    .then(response => {
      // response.json()\
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => dispatch({
        type: 'REQUEST_USER_SUCCESS',
        payload: data
    }))
    .catch(error => dispatch({
        type: 'REQUEST_USER_FAILED',
        payload: error
    }))
}
