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

// class App extends Component {

// //   initializeUserInfo = async () => {
// //     const loggedInfo =storage .get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
// //     if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

// //     const { UserActions } = this.props;
// //     UserActions.setLoggedInfo(loggedInfo);
// //     try {
// //         await UserActions.checkStatus();
// //     } catch (e) {
// //         storage.remove('loggedInfo');
// //         window.location.href = '/auth/login?expired';
// //     }
// // }
//   // componentDidMount() {
//   //   this.initializeUserInfo();
//   // }

//     // async componentDidMount() {
//     //   const apps = await this.props.onRequestProgress();
//     //   const companies = await this.props.onRequestCompany();
//     //   var newCategory = [];
//     //   for (var i=0;i<this.props.categories.length;i++){
//     //     newCategory = newCategory.concat({
//     //       Type : this.props.categories[i].name,
//     //       SuggestionsOrSeleceted : []
//     //     })
//     //   }
//     //   this.props.setSelectedCategories(newCategory)
//     // }

//     render(){
//         // this.props.updateFilteredProgress(this.props.apps);

  function App(props){

    // useEffect(() => {
    //   if(localStorage.getItem('jwt-token')){
    //   console.log(localStorage.getItem('user'))
    //   console.log(JSON.parse(localStorage.getItem('user')))
    //   }
    // },[])
    
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
