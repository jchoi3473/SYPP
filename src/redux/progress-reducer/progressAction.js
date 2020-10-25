export const setApps = (apps) => ({
    type: 'SET_APPS',
    payload: apps
});  

export const requestProgress = () => (dispatch) => {
    dispatch({type: 'REQUEST_PROGRESS_PENDING'});
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(data => dispatch({
        type: 'REQUEST_PROGRESS_SUCCESS',
        payload: data
    }))
    .catch(error => dispatch({
        type: 'REQUEST_PROGRESS_FAILED',
        payload: error
    }))
}

// async export function requestProgress(dispatch){
//     dispatch({type: 'REQUEST_PROGRESS_PENDING'});
//     const response = await fetch('http://localhost:3000/')
//     const json = await response.json()
//     const data = await dispatch({
//         type: 'REQUEST_PROGRESS_SUCCESS',
//         payload: json
//     })
// }
// export default requestProgress


export const postProgress = (application) => (dispatch) =>{
    console.log("STRING"+JSON.stringify({application}))
    dispatch({type: 'POST_PROGRESS_PENDING'});
    fetch('http://localhost:3000/abc', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        application
      })
    })
    .then(response => response.json())
    .then(() => dispatch({
            type: 'POST_PROGRESS_SUCCESS',
        })
    ).then(requestProgress())
    .catch(error => dispatch({
        type: 'POST_PROGRESS_FAILED',
        payload: error
    }))
}
