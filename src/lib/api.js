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
        return res.status === 200 ? res.data : "error";
    } catch (error) {
        return error
    } 
}


export const getCompany = async function(uID){
  console.log(uID)
  try {
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/GetCompanies')
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}


export const updateFavorite = async function(uID, type, typeID, isFavorite){
    if(type==="application"){
      const userFavorite = {
        applicationID : typeID, 
        IsFavorite : isFavorite
      }
      try {
          console.log("triggered update favorite")
          const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/UpdateIsFavorite', userFavorite)
          return res.status === 200 ? res.data : "error";
      } catch (error) {
          return error
      } 
  }else if(type==="company"){
    const userFavorite = {
      companyID : typeID, 
      IsFavorite : isFavorite
    }
    try {
        console.log("triggered update favorite")
        const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/UpdateIsFavorite', userFavorite)
        return res.status === 200 ? res.data : "error";
    } catch (error) {
        return error
    } 
  }
}

export const postCompany = async function(companyName){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  const companyDetail = {
    companyName : companyName, 
    uID : uID
  }
  console.log(uID)
  try {
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/create', companyDetail)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}


export const createEvent = async function(type, event){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/CreateEvent', event)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/CreateEvent', event)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

export const updateEvent = async function(type, event){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/UpdateEvent', event)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/UpdateEvent', event)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}



// export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
// export const checkUsernameExists = (username) => axios.get('/api/auth/exists/username/' + username);

// export const localRegister = ({email, username, password}) => axios.post('/api/auth/register/local', { email, username, password });
// export const localLogin = ({email, password}) => axios.post('/api/auth/login/local', { email, password });

// export const checkStatus = () => axios.get('/api/auth/check');
// export const logout = () => axios.post('/api/auth/logout');7  v