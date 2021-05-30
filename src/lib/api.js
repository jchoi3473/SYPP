import axios from 'axios';

    export const localLogin = async function(idValue, passwordValue){
      const userInfo = { Email : idValue, Password: passwordValue };
      const response = await axios.post(
        "https://saveyourappdevelopment.azurewebsites.net/auth/authenticate",
        userInfo
      );
      //need to do something so that we can validate user(correctness)
      if(response.data.token){
        localStorage.setItem('jwt-token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data)
        return response.data
        // props.history.push('/main');
      }
      
    };

    export const getApplication = async function(uID){
        console.log(uID)
        try {
            const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/GetApplications')
            console.log(res)
            return res.status == 200 ? res.data : "error";
        } catch (error) {
            return error
        } 
    }
// export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
// export const checkUsernameExists = (username) => axios.get('/api/auth/exists/username/' + username);

// export const localRegister = ({email, username, password}) => axios.post('/api/auth/register/local', { email, username, password });
// export const localLogin = ({email, password}) => axios.post('/api/auth/login/local', { email, password });

// export const checkStatus = () => axios.get('/api/auth/check');
// export const logout = () => axios.post('/api/auth/logout');