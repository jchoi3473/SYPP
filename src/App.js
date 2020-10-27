import React, {Component, useState} from 'react';
import ModalBox from './components/addApp/ModalBox.js';
import ApplicationList from './main_applications/ApplicationList'
import Applications from './main_applications/Applications'
import MainPage from './main/MainPage'
import {connect} from 'react-redux'
import {requestProgress} from './redux/progress-reducer/progressAction'
import {setSelectedCategories} from './redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './redux/filteredProgress-reducer/filteredProgressAction'
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
  }
}

class App extends Component {
  
  async componentDidMount() {
    const apps = await this.props.onRequestProgress();
    var newCategory = [];
    for (var i=0;i<this.props.categories.length;i++){
      newCategory = newCategory.concat({
        Type : this.props.categories[i].name,
        SuggestionsOrSeleceted : []
      })
    }
    this.props.setSelectedCategories(newCategory)
  }

  render(){
      this.props.updateFilteredProgress(this.props.apps);
    return (
      <div className="App">
       <MainPage/>
      </div>
    );  
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(App);
