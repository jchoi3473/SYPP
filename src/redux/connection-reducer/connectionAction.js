export const setConnection = (connection) => (dispatch) =>{
    dispatch({type: 'REQUEST_CONNECTION_PENDING'});
    // dispatch({
    //     type: 'REQUEST_CONNECTION_SUCCESS',
    //     payload: connection
    // }).catch(error => dispatch({
    //     type: 'REQUEST_CONNECTION_FAILED',
    //     payload: error
    // }))
    try {
        dispatch({
            type: 'REQUEST_CONNECTION_SUCCESS',
            payload: connection
        })
      } catch (error) {
        dispatch({
            type: 'REQUEST_CONNECTION_FAILED',
            payload: error
        })
      }
  }
