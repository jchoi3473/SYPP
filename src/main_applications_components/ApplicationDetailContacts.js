import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './../main_applications/ApplicationDetail.scss'
import Modal from 'react-bootstrap/Modal';
import CreateEditContact from '../create_edit_applications_components/create_edit_contact/CreateEditContact';


class ApplicationDetailContacts extends Component{
    constructor(props){
        super(props)
        this.state = {
            radioValue : '0',
            show : false
        }
    }

    radioChange = (e) =>{
        this.setState({
            radioValue : e.target.value
        })
    }

    display = () =>{
        switch(this.state.radioValue) {
            case '0' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        {this.props.contact.email.email}
                    </div>
                )
            case '1' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        {this.props.contact.phone.phoneNumber}
                    </div>
                )
            case '2' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        {
                        this.props.contact.convo.map((data) => (
                            <div>   
                            {
                            data.length !== 0 ?  
                              <div>
                              {
                                data.marginType === 0? 
                                <div className = "sypp-note-text-header">{' • ' +data.content}</div> :
                                <div className = "sypp-note-text-subText">{' • ' +data.content}</div>
                              }
                              </div>
                              : undefined
                            }
                            </div>
                          ))
                    }
                    </div>
                )
        }
    }
    handleClose = () => {
        this.setState({
          show:false
        })
      }
    handleOpen = (e) =>{
    e.preventDefault()
    this.setState({
        show:true
    })
    }

    render(){
        return(
            <div>
                <div className = "sypp-applicationDetailContactsContainer"  >
                    <div>
                        <div className = "sypp-applicationDetailContactsTitle">
                            <div className = "sypp-applicationDetailTextTitle">{this.props.contact.detail.firstname}</div>
                            <div className = "sypp-applicationDetailTextTitle-body">{this.props.contact.detail.title}</div>
                        </div>
                        <ButtonGroup toggle className = {this.props.classContainerProps}>
                        {radios.map((radio, idx) => (
                            <div className="sypp-button-container-applicationDetail">
                                <ToggleButton
                                className={"sypp-applicationDetialButtonGroups sypp-activeChange sypp-hoverChange sypp-text"}
                                key={idx}
                                type="radio"
                                variant="secondary"
                                name={radio.name}
                                value={radio.value}
                                checked={this.state.radioValue === radio.value}
                                onChange={(e) => this.radioChange(e, this.state.radioValue)}
                                >
                                <div className = "sypp-radio-button-container-applicationDetail" name = {radio.name} value = {radio.value}>
                                    {radio.name}
                                </div>
                                </ToggleButton>
                                </div>
                        ))}
                            </ButtonGroup>
                        </div>
                        <div onClick = {this.handleOpen}>
                            {this.display()}
                        </div>
                </div>
            <Modal 
            show={this.state.show}
            onHide={this.handleClose}
            centered
            dialogClassName = "sypp-create-detail-modal sypp-modal-content"
            className = "sypp-modal-content"
            >
                <div className = 'sypp-create-detail-modal-container'>
                    <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                    <CreateEditContact onSaveContactNote = {this.props.onSaveContactNote} contact = {this.props.contact} handleClose = {this.handleClose} type ={this.props.type} companyID = {this.props.companyID} applicationID = {this.props.applicationID}/>
                </div>
            </Modal>
            </div>
        )
    }
}
export default connect(null,null)(ApplicationDetailContacts)
const radios = 
        [
            { name: 'Email', value: '0' },
            { name: 'Phone', value: '1' },
            { name: 'Convo', value: '2' },
        ]