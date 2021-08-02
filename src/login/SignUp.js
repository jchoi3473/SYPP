import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {postLogin} from '../redux/user-reducer/userAction'
import axios from "axios";
import {userSignUp} from '../lib/api'
const mapDispatchToProps= dispatch =>{
  return {
    postLogin: (email, password) => dispatch(postLogin(email, password))
  }
}

function SignUp(props){
    const [idValue, setIdValue] = useState('');
    const [firstName, setFirstName] =  useState('');
    const [lastName, setLastName] =  useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [user, setUser] = useState()

    //maybe load applications here? 
    // useEffect(() => {
    //   console.log(localStorage.getItem('jwt-token'))
    //   if(localStorage.getItem('jwt-token')){
    //     console.log("Its logged in!")
    //     props.history.push('/main');
    //   }
    // },[])
    
    const onClickSignUp = async e => {

      // e.preventDefault();
      if(passwordValue !== repeatPasswordValue){
        console.log("passwords don't match, please try again!")
      }
      const data = await userSignUp(idValue, passwordValue, firstName, lastName)
      if (data){
        props.history.push('login');
      }
    };
    const redirectLogin = () => {
      props.history.push('login')
    }

    return (
      <div className="sypp-signup-container">
        <div className="sypp-login-Title">Sign Up</div>
        <form>
          <div className ="sypp-login-subContainer">
          <div style={{marginRight:"9px"}}>
            <div className="sypp-login-subTitle">First Name</div>
            <input
              className ="sypp-login-input sypp-login-nameInput"
              placeholder="First Name"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
            />
            </div>
          <div>
            <div className="sypp-login-subTitle">Last Name</div>
            <input
              className ="sypp-login-input sypp-login-nameInput"
              placeholder="Last Name"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          </div>
          <div className="sypp-login-subTitle">Email</div>
          <input
            className ="sypp-login-input"
            placeholder="Email"
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
          <div className="sypp-login-subTitle">Repeat Password</div>
          <input
            type="password"
            className ="sypp-login-input"
            placeholder="Password"
            onChange={e => setRepeatPasswordValue(e.target.value)}
            value={repeatPasswordValue}
          />
          </form>
        <button className="sypp-login-button" onClick = {e => onClickSignUp()}>Sign Up</button>
        <div className="sypp-login-query-container">
        <div className="sypp-login-query">
          Already have an account?
        </div>
        <div className="sypp-login-query-button" onClick = {() => redirectLogin()} >Log in</div>
        </div>
      </div>
    );  
}

export default connect(null, mapDispatchToProps)(SignUp);
