import React, { Component } from 'react';
import CompanyListComponents from './CompanyListComponents'
import Rating from 'react-rating';

import './CompanyList.scss'
import {setCompany} from './../redux/company-reducer/companyAction'
import {connect} from 'react-redux'



const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}
const mapDispatchToProps= dispatch =>{
  return {
      setCompany: (companies) => dispatch(setCompany(companies))
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

      onClickIsFavorite = (companyID) =>{
        var companies = this.props.companies

        for(var i=0; i<companies.length;i++){
            if(companies[i].companyID+"" === companyID+""){
              companies[i].Detail.IsFavorite = !companies[i].Detail.IsFavorite
                break;
            }
        }
        this.props.setCompany(companies)
        this.setState({})
    }

   

    render(){
        const searchFilteredProgress = this.props.companies.filter(company => {
            return (company.Detail.CompanyName.toLowerCase().includes(this.state.searchField.toLowerCase()))
          })
        return(
            <div>
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-searchBox"
            type='search' 
            placeholder = '  Search company'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            {
              (searchFilteredProgress.length > 0)?
              searchFilteredProgress.map((data) => (
                <div className = "sypp-Company-container">
                  <Rating className ="sypp-starIcon" companyName = {data.companyID} stop={1} initialRating = {data.Detail.IsFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.companyID)}
                  emptySymbol="fa fa-star-o starSize starIcon"
                  fullSymbol = "fa fa-star starSize starIcon"
                  />
                <div className = "sypp-CompanyList" onClick = {() => this.props.toCompanyDetail(data.companyID)}>{data.Detail.CompanyName}</div>
                </div>
              )):undefined
            }
          </div>
        )
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyList)