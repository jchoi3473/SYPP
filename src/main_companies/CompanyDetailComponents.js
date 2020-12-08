import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import {requestProgress} from '../redux/progress-reducer/progressAction'
import {setSelectedCategories} from '../redux/addApp-reducer/addAppAction'
import {setCompany} from './../redux/company-reducer/companyAction'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'
import './../components/radio/RadioButtons.css'

import ApplicationDetailEvents from './../main_applications_components/ApplicationDetailEvents'
import ApplicationDetailContacts from '../main_applications_components/ApplicationDetailContacts'
import ApplicationDetailNotes from '../main_applications_components/ApplicationDetailNotes'
import ApplicationDetailFollowUp from './../main_applications_components/ApplicationDetailFollowUp'
import ApplicationDetailChecklists from './../main_applications_components/ApplicationDetailChecklists'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import CreateEditEvent from './../create_edit_applications_components/create_edit_event/CreateEditEvent'
import CreateEditNote from './../create_edit_applications_components/create_edit_note/CreateEditNote'
import CreateEditContact from './../create_edit_applications_components/create_edit_contact/CreateEditContact'
import CreateEditConversation from '../create_edit_applications_components/create_edit_conversation/CreateEditConversation'
import CreateEditChecklist from './../create_edit_applications_components/create_edit_checklist/CreateEditChecklist'
import Modal from 'react-bootstrap/Modal';
import ReactTooltip from 'react-tooltip'


const mapStatetoProps = state => {
  return{
    companies: state.companies.companies,
    applicationDetail : state.applicationDetail.application
  }
}
const mapDispatchToProps= dispatch =>{
    return {
        setCompany : (companies) => dispatch(setCompany(companies))
    }
  } 

const radios =  
[ 
{ name: 'Events', value: '0' },
{ name: 'Notes', value: '1' },
{ name: 'Contacts', value: '2' },
{ name: 'Conversation History', value: '3' },
{ name: 'Checklists', value: '4' },
]

class CompanyDetailComponents extends Component{
    constructor(props){
        super(props);
        this.state = {
            radioValue : '0',
            radioName : 'Events',
            textValue : '',
            selectedValue : '',
            show: false

        }
    }
    handleClose =() =>{
        this.setState({
            show: false
        })
    }
    handleShow = () =>{
        this.setState({
            show:true
        })
    }
    radioChange = (e) => {
        this.setState({
            radioValue: e.target.value,
            radioName: e.target.getAttribute('name')
        })
    }

    onChangeTextArea = (e) =>{
        this.setState({
            textValue: e.target.value
        })
    }
    onSaveEventNote = () =>{
        this.setState({
            radioName : 'Events',
            radioValue : '0',
        })
    }
    onSaveNote = () =>{
        this.setState({
            radioName : 'Notes',
            radioValue : '1',
        })
    }
    onSaveContactNote = () =>{
        this.setState({
            radioName : 'Contacts',
            radioValue : '2',
        })
    }
    onSaveConversation  = () =>{
        this.setState({
            radioName : 'Conversation History',
            radioValue : '3',
        })
    }
    onSaveChecklist  = () =>{
        this.setState({
            radioName : 'Checklists',
            radioValue : '4',
        })
    }

    triggerComponents = () =>{
        if(this.state.selectedValue === '0'){
            return(
                <CreateEditEvent Event = {''} onSaveEventNote = {this.onSaveEventNote} handleClose = {this.handleClose} companyID = {this.props.companyDetail.companyID} type ={'company'}/>
            // <div>Events</div>
            );
        }
        else if(this.state.selectedValue === '1'){
            return(
                <CreateEditNote Note = {''} onSaveNote = {this.onSaveNote} handleClose = {this.handleClose} companyID = {this.props.companyDetail.companyID} type ={'company'}/>
            );
        }
        else if(this.state.selectedValue === '2'){
            return(
                <CreateEditContact Contact = {''} onSaveContactNote = {this.onSaveContactNote} handleClose = {this.handleClose} companyID = {this.props.companyDetail.companyID} type ={'company'}/>
            );
        }
        else if(this.state.selectedValue === '3'){
            return(
                <CreateEditConversation FollowUp = {''} onSaveConversation = {this.onSaveConversation} handleClose = {this.handleClose} companyID = {this.props.companyDetail.companyID} type ={'company'}/>
            );
        }
         else if(this.state.selectedValue === '4'){
            return(
                <CreateEditChecklist onSaveChecklist = {this.onSaveChecklist} Checklist = {''} handleClose = {this.handleClose} companyID = {this.props.companyDetail.companyID} type ={'company'} editorState = {''}/>
            );
        }
        return(
            <div></div>
        )
    }

    display = () =>{
        switch(this.state.radioValue){
            case '0':
                return (
                    <div>
                        {
                        this.props.companyDetail.Events.map((event) =>(
                            <ApplicationDetailEvents Event = {event} onSaveEventNote = {this.onSaveEventNote} companyID = {this.props.companyDetail.companyID} type = {'company'}/>
                        ))
                        }
                    </div>
                )
            case '1':
                return (
                    <div>
                        {
                        this.props.companyDetail.Notes.map((note) =>(
                            <ApplicationDetailNotes Note = {note} onSaveNote = {this.onSaveNote} companyID = {this.props.companyDetail.companyID} type = {'company'}/>
                        ))
                        }
                    </div>
                )
            case '2':
                return (
                <div>
                    {this.props.companyDetail.Contacts.map((data) => (
                        <ApplicationDetailContacts contact = {data} onSaveConvoNote = {this.onSaveContactNote} companyID = {this.props.companyDetail.companyID} type = {'company'}/>
                    ))
                    }
                </div>                
                )
            case '3':
                return (
                    <div>{
                        this.props.companyDetail.FollowUps.map((FollowUp) =>(
                            <ApplicationDetailFollowUp onSaveConversation = {this.onSaveConversation} FollowUp = {FollowUp} companyID = {this.props.companyDetail.companyID} type = {'company'}/>
                        ))
                    }</div>
                )
            case '4':
                return (
                    <div>
                    {
                        this.props.companyDetail.Checklists.map((checklist) =>(
                            <ApplicationDetailChecklists onSaveChecklist = {this.onSaveChecklist} Checklist = {checklist} companyID = {this.props.companyDetail.companyID} type = {'company'}/>
                        ))
                    }
                    </div>
                )
        }
    }
    onClick = (value) => {
        if(value === '0'){
            this.setState({
                show:true,
                selectedValue: '0',
                radioName:'Events',
                radioValue :'0'
            })

        }
        else if(value==='1'){
            this.setState({
                show:true,
                selectedValue: '1',
                radioName:'Notes',
                radioValue :'1'
            })
        }
        else if(value==='2'){
            this.setState({
                show:true,
                selectedValue: '2',
                radioName:'Contacts',
                radioValue :'2'
            })
        }
        else if(value==='3'){
            this.setState({
                show:true,
                selectedValue: '3',
                radioName:'Conversation History',
                radioValue :'3'
            })
        }
        else if(value==='4'){
            this.setState({
                show:true,
                selectedValue: '4',
                radioName:'Checklists',
                radioValue :'4'
            })
        }
    }
    render(){
        return (
        <div>
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
                <div style={{overflowY: 'scroll', height: '475px'}}>
                {this.display()}
                </div>
                <div>
            <button data-for="addDetailButton"
                    data-tip = '' 
                    className = "sypp-detail-add-button">+</button>

            <ReactTooltip
            id= "addDetailButton"
            className = "sypp-create-detail-tooltip"
            effect='solid'
            delayHide={250}
            place={'right'}
            disable	={false}
            >
                <div className = "sypp-tooltip-button-container">
                <button className = "sypp-create-detail-button" onClick = {() => this.onClick('0')}>Events</button>
                <button className = "sypp-create-detail-button" onClick = {() => this.onClick('1')}>Notes</button>
                <button className = "sypp-create-detail-button" onClick = {() => this.onClick('2')}>Contacts</button>
                <button className = "sypp-create-detail-button" onClick = {() => this.onClick('3')}>Conversation Histories</button>
                <button className = "sypp-create-detail-button" onClick = {() => this.onClick('4')}>Checklists</button>
                </div>
            </ReactTooltip>
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
                    {this.triggerComponents()}
                </div>
            </Modal>
        </div>
        );  
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(CompanyDetailComponents);
