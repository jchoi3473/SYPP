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

export const userSignUp = async function(idValue, passwordValue, firstName, lastName){
  const userInfo = { Email : idValue, Password: passwordValue, Firstname: firstName, Lastname: lastName };
  const response = await axios.post(
    "https://saveyourappdevelopment.azurewebsites.net/auth/register",
    userInfo
  );
  //need to do something so that we can validate user(correctness)
  if(response.data.token){
    console.log(response.data.token)
    localStorage.setItem('jwt-token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log(response.data)
    return response.data
    // props.history.push('/main');
  }else{
    return response.data
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

export const getEvent = async function(type, typeID, eventID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/'+typeID+'/GetEvent/'+eventID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/'+typeID+'/GetEvent/'+eventID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
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

export const deleteEvent = async function(type, typeID, eventID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.delete('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/'+typeID+'/DeleteEvent/'+eventID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/'+typeID+'/DeleteEvent/'+eventID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

export const getNote = async function(type, typeID, noteID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/'+typeID+'/GetNote/'+noteID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/'+typeID+'/GetNote/'+noteID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

export const createNote = async function(type, note){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/CreateNote', note)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/CreateNote', note)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

export const updateNote = async function(type, note){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/UpdateNote', note)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/UpdateNote', note)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

export const deleteNote = async function(type, typeID, noteID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
    if(type==="application"){
      const res = await axios.delete('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/'+typeID+'/DeleteNote/'+noteID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }else if(type==="company"){
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/company/'+uID+'/'+typeID+'/DeleteNote/'+noteID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
    }
  } catch (error) {
      return error
  } 
}

//Endpoints for Contents
export const getContent = async function(type, typeID, contentType, contentID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/'+type+'/'+uID+'/'+typeID+'/Get'+contentType+'/'+contentID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}

export const deleteContent = async function(type, typeID, contentType, contentID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.delete('https://saveyourappdevelopment.azurewebsites.net/'+type+'/'+uID+'/'+typeID+'/Delete'+contentType+'/'+contentID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}

export const editContent = async function(type,action,contentType,content){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/'+type+'/'+uID+'/'+action+contentType, content)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}

export const getTask = async function(applicationID, midTaskID){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.get('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/GetApplications/'+applicationID+'/GetMidTask/'+midTaskID)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}

export const updateTask = async function(task){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/UpdateMidTask', task)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}

export const createTask = async function(task){
  const uID = JSON.parse(localStorage.getItem('user')).uID
  try {
      const res = await axios.post('https://saveyourappdevelopment.azurewebsites.net/applications/'+uID+'/CreateTask', task)
      console.log(res)
      return res.status === 200 ? res.data : "error";
  } catch (error) {
      return error
  } 
}