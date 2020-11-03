import React, { Component } from 'react';
import CompanyListComponents from './CompanyListComponents'

import {connect} from 'react-redux'



const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}

export class CompanyList extends Component{
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
        return(
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
               <div onClick = {() => this.props.toCompanyDetail(data.companyID)}>{data.Detail.CompanyName}</div>
               )):undefined
            }
          </div>
        )
    }

}
export default connect(mapStatetoProps, null)(CompanyList)