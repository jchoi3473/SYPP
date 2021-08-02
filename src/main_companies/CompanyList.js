import React, { Component } from 'react';
import Rating from 'react-rating';

import './../add_application/Modalbox.css'
import './CompanyList.scss'
import {setCompany} from './../redux/company-reducer/companyAction'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { updateFavorite, postCompany } from '../lib/api';
import '../main_applications/ApplicationList.scss'



const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
        connection: state.connection.connection
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
            searchField:'',
            show: false,
            companyName : ''
        }
      }
    onChangeCompanyName = (e) =>{
      this.setState({
        companyName : e.target.value
      })
    }
    onSearchChange = (e) =>{
      this.setState({
          searchField: e.target.value
      })
      console.log(this.state.searchField)
    }
    async onClickIsFavorite (companyID){
        var companies = this.props.companies
        for(var i=0; i<companies.length;i++){
          if(companies[i].companyID+"" === companyID+""){
            companies[i].detail.isFavorite = !companies[i].detail.isFavorite
            this.props.setCompany(companies)
                await updateFavorite(JSON.parse(localStorage.getItem('user')).uID, "company", companyID, companies[i].detail.isFavorite)
                if (this.props.connection) {
                    try {
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_IsFavorite_Update', JSON.parse(localStorage.getItem('user')).uID, companyID, companies[i].detail.isFavorite)  
                    } catch(e) {
                        console.log(e);
                    }
                }
                break;
            }
        }
        this.setState({})
    }

    async onClickSave(){
      const result = await postCompany(this.state.companyName)
      console.log(result)
      this.handleClose()
      if (this.props.connection) {
        try {
            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
            await this.props.connection.invoke('Company_Add_Update', JSON.parse(localStorage.getItem('user')).uID, result.companyID)  
        } catch(e) {
            console.log(e);
        }
      }
    }



    handleClose = () =>{
      this.setState({
        show: false
      })
    }
    handleShow = () =>{
      this.setState({
        show:true
      })
    }
  
   

    render(){
        const searchFilteredProgress = this.props.companies.filter(company => {
            return (company.detail.companyName.toLowerCase().includes(this.state.searchField.toLowerCase()))
          })
        return(
            <div>
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-applicationlist-searchBox sypp-applicationlist-searchBox-company"
            type='search' 
            placeholder = '  Search company'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            <div className = "sypp-Company-body" style={{height: "500px", overflowY:"scroll", width:"fitContent"}}>
              {
                (searchFilteredProgress.length > 0)?
                searchFilteredProgress.map((data) => (
                  <div className = "sypp-Company-container">
                    <Rating className ="sypp-starIcon" companyName = {data.companyID} stop={1} initialRating = {data.detail.isFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.companyID)}
                    emptySymbol="fa fa-star-o starSize starIcon"
                    fullSymbol = "fa fa-star starSize starIcon"
                    />
                  <div className = "sypp-CompanyList" onClick = {() => this.props.toCompanyDetail(data.companyID)}>{data.detail.companyName}</div>
                  </div>
                )):undefined
              }
            </div>    
            <div onClick = {this.handleShow} className = {"sypp-newcompany-button"}>
                <div className = "sypp-newapp-button-plus">+</div>
                <div className = "sypp-newapp-button-body">New Company</div>
            </div>
            <Modal
            show = {this.state.show}
            onHide={this.handleClose} 
            centered
            dialogClassName = "sypp-ModalMain"
            >
              <div className = "sypp-Modal-container">
              <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
              <div className = "sypp-addcompany-container">
                <div className = "sypp-addcompany-title">Which company would you like to add?</div>
                <input
                        className ="sypp-modal-input"
                        placeholder="Company Name"
                        onChange={e => this.onChangeCompanyName(e)}
                        value={this.state.companyName}
                />
                </div>
                  <button className ="sypp-company-button-next" onClick = {()=> this.onClickSave()}>
                         Save
                  </button>
              </div>
            </Modal>
          </div>
        )
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyList)