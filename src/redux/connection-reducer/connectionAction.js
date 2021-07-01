export const setConnection = (connection) => (dispatch) =>{
    dispatch({type: 'REQUEST_CONNECTION_PENDING'});
    dispatch({
        type: 'REQUEST_USER_SUCCESS',
        payload: connection
    }).catch(error => dispatch({
        type: 'REQUEST_USER_FAILED',
        payload: error
    }))
  }
