import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {postLogin} from './../redux/user-reducer/userAction'
import axios from "axios";
import {localLogin} from './../lib/api'
import './Login.scss'
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
    };
    const redirectSignup = () => {
      props.history.push('signup')
    }

    return (
      <div className="sypp-login-container">
        <div className="sypp-login-Title">Log In</div>
        <form>
          <div className="sypp-login-subTitle">Email Address</div>
         <input
            className ="sypp-login-input"
            placeholder="Email Address"
            onChange={e => setIdValue(e.target.value)}
            value={idValue}
          />
          <div className="sypp-login-subTitle">Password</div>
          <input
            type="password"
            className ="sypp-login-input"
            placeholder="Password"
            onChange={e => setPasswordValue(e.target.value)}
            value={passwordValue}
          />
          </form>
        <button className="sypp-login-button" onClick = {e => onClickLogIn()}>LogIn</button>
        <div className="sypp-login-query-container">
          <div className="sypp-login-query">
            Don't have an account? 
          </div>
          <div className="sypp-login-query-button" onClick = {() => redirectSignup()}>Create an account</div>
        </div>
      </div>
    );  
}

export default connect(null, mapDispatchToProps)(Login);
