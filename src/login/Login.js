import React, {useState} from 'react';
import {connect} from 'react-redux'
import {postLogin} from './../redux/user-reducer/userAction'
import axios from "axios";

const mapDispatchToProps= dispatch =>{
  return {
    postLogin: (email, password) => dispatch(postLogin(email, password))
  }
}

function Login(props){
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [user, setUser] = useState()

    
    // const onClickLogIn = () =>{
    //   props.postLogin(idValue, passwordValue)
    // }
    const onClickLogIn = async e => {
      // e.preventDefault();
      const userInfo = { Email : idValue, Password: passwordValue };
      // send the username and password to the server
      const response = await axios.post(
        "https://saveyourappdevelopment.azurewebsites.net/auth/authenticate",
        userInfo
      );
      // set the state of the user
      setUser(response.data)
      // store the user in localStorage
      localStorage.setItem('user', response.data)
      console.log(response.data)
      console.log(user)
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
