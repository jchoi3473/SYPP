import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {postLogin} from './../redux/user-reducer/userAction'
import axios from "axios";
import {localLogin} from './../lib/api'
const mapDispatchToProps= dispatch =>{
  return {
    postLogin: (email, password) => dispatch(postLogin(email, password))
  }
}

function Login(props){
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [user, setUser] = useState()

    //maybe load applications here? 
    useEffect(() => {
      console.log(localStorage.getItem('jwt-token'))
      if(localStorage.getItem('jwt-token')){
        console.log("Its logged in!")
        props.history.push('/main');
      }
    },[])
    
    const onClickLogIn = async e => {

      // e.preventDefault();
      const data = await localLogin(idValue, passwordValue)
      if (data){
        props.history.push('/main');
      }

      // const userInfo = { Email : idValue, Password: passwordValue };
      // const response = await axios.post(
      //   "https://saveyourappdevelopment.azurewebsites.net/auth/authenticate",
      //   userInfo
      // );
      // if(response.data.token){
      //   localStorage.setItem('jwt-token', response.data.token);
      //   props.history.push('/main');
      // }
      // localStorage.setItem('user', JSON.stringify(response.data));
      // console.log(response.data)

    };

    return (
      <div>
        <form>
         <input
            // className ="sypp-modal-input company"
            placeholder="Enter Your Email"
            onChange={e => setIdValue(e.target.value)}
            value={idValue}
          />
          <input
            // className ="sypp-modal-input company"
            placeholder="Enter Your Email"
            onChange={e => setPasswordValue(e.target.value)}
            value={passwordValue}
          />
          </form>
        <button onClick = {e => onClickLogIn()}>LogIn</button>
      </div>
    );  
}

export default connect(null, mapDispatchToProps)(Login);
