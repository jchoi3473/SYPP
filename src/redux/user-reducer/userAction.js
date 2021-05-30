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
      console.log("response token", response.token)
      if (response.token) {
        localStorage.setItem('wtw-token', response.token);
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
