import React, { Component, useState } from 'react';
import './../components/radio/RadioButtons.css';
import './../main_applications/CategoryButtons.scss';

import {connect} from 'react-redux'
import {updateFilteredProgress, updateFilteredProgressTitle, updateFilteredProgressButtonValue} from '../redux/filteredProgress-reducer/filteredProgressAction'



const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      filteredProgress: state.filteredProgress,
      companies: state.companies.companies,
  }
}


class CompanyListComponents extends Component {
  constructor(){
    super();
    this.state =  {
        searchField:''
    }
  }
  
  onSearchChange = (e) =>{
    this.setState({
        searchField: e.target.value
    })
    console.log(this.state.searchField)
  }


  render(){
    const searchFilteredProgress = this.props.companies.filter(company => {
      return (company.Detail.CompanyName.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })

      return (
          <div>
            <div className ="searchBox-container">
            <input 
            className ="searchBox"
            type='search' 
            placeholder = '  Search application'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            {
               (searchFilteredProgress.length > 0)?
               searchFilteredProgress.map((data) => (
               <div onClick = {this.props.toCompanyDetail(data.companyID)}>{data.Detail.CompanyName}</div>
               )):undefined
            }
          </div>
      );
  }
}
export default connect(mapStatetoProps, null)(CompanyListComponents);

