import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './main/MainPage';
import Login from './login/Login';
import SignUp from './login/SignUp';
import {connect} from 'react-redux';
import {requestProgress} from './redux/progress-reducer/progressAction';
import {setSelectedCategories} from './redux/addApp-reducer/addAppAction';
import {updateFilteredProgress} from './redux/filteredProgress-reducer/filteredProgressAction';
import {requestCompany} from './redux/company-reducer/companyAction';
import './App.css';



const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      pending: state.progress.isPending,
      categories: state.categories.categories
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      onRequestProgress: () => dispatch(requestProgress()),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
      onRequestCompany: () => dispatch(requestCompany())
  }
}


  function App(props){
    
      return (
        <div className = "sypp-App">
        <BrowserRouter>
          <Switch>
            <Route path = "/login" component = {Login}/>
            <Route path = "/signup" component = {SignUp}/>
            <Route path = "/main" component = {MainPage}/>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
            
          </Switch>
        </BrowserRouter>
        </div>
      );  
  }


export default connect(mapStatetoProps,mapDispatchToProps)(App);
