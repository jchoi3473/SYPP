import React, { Component, useState } from 'react';
import './../components/radio/RadioButtons.css';
import './CategoryButtons.scss';

import {connect} from 'react-redux'
import {updateFilteredProgress, updateFilteredProgressTitle, updateFilteredProgressButtonValue} from '../redux/filteredProgress-reducer/filteredProgressAction'



const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      filteredProgress: state.filteredProgress
  }
}
const mapDispatchToProps= dispatch =>{
  return {
    updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
    updateFilteredProgressTitle: (title) => dispatch(updateFilteredProgressTitle(title)),
    updateButtonValue: (value) => dispatch(updateFilteredProgressButtonValue(value))
  }
}

function CompanyListComponents(props) {

    return (
        <div></div>
    );
  }
  export default connect(mapStatetoProps, mapDispatchToProps)(CompanyListComponents);

