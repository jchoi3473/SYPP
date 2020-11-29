import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {requestProgress, setApps} from './../redux/progress-reducer/progressAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'

import './../components/radio/RadioButtons.css'
import './ApplicationDetail.scss'

import ApplicationDetailEvents from './../main_applications_components/ApplicationDetailEvents'
import ApplicationDetailContacts from './../main_applications_components/ApplicationDetailContacts'
import ApplicationDetailNotes from './../main_applications_components/ApplicationDetailNotes'
import ApplicationDetailFollowUp from './../main_applications_components/ApplicationDetailFollowUp'
import ApplicationDetailChecklists from './../main_applications_components/ApplicationDetailChecklists'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ReactTooltip from 'react-tooltip'
import Modal from 'react-bootstrap/Modal';

import CreateEditEvent from '../create_edit_applications_components/create_edit_event/CreateEditEvent'
import CreateEditNote from './../create_edit_applications_components/create_edit_note/CreateEditNote'
import CreateEditContact from '../create_edit_applications_components/create_edit_contact/CreateEditContact';
import CreateEditConversation from '../create_edit_applications_components/create_edit_conversation/CreateEditConversation';

const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      pending: state.progress.isPending,
      categories: state.categories.categories, 
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      onRequestProgress: () => dispatch(requestProgress()),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
      setApps : (applications) => dispatch(setApps(applications))
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

class ApplicationDetailComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            radioValue : '0',
            radioName : 'Events',
            addDetailName : '',
            textValue : '',
            selectedValue : '',
            show: false
        }
    }
    //modal states
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
            radioValue : e.target.value,
            radioName:e.target.getAttribute('name')
        })
    }

    onChangeTextArea = (e) =>{
        this.setState({
            textValue:e.target.value
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
            radioValue : '3',
        })
    }
    onSaveConversatio  = () =>{
        this.setState({
            radioName : 'Conversation History',
            radioValue : '4',
        })
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
    }

    triggerComponents = () =>{
        if(this.state.selectedValue === '0'){
            return(
                <CreateEditEvent Event = {''} handleClose = {this.handleClose} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
            // <div>Events</div>
            );
        }
        else if(this.state.selectedValue === '1'){
            return(
                <CreateEditNote Note = {''} handleClose = {this.handleClose} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
            );
        }
        else if(this.state.selectedValue === '2'){
            return(
                <CreateEditContact Contact = {''} handleClose = {this.handleClose} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
            );
        }
        else if(this.state.selectedValue === '3'){
            return(
                <CreateEditConversation FollowUp = {''} handleClose = {this.handleClose} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
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
                        this.props.applicationDetail.Events.map((event) =>(
                            <ApplicationDetailEvents onSaveEventNote = {this.onSaveEventNote} Event = {event} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                        ))
                        }
                    </div>
                )
            case '1':
                return (
                    <div>
                        {
                        this.props.applicationDetail.Notes.map((note) =>(
                            <ApplicationDetailNotes onSaveNote = {this.onSaveNote} Note = {note} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                        ))
                        }
                    </div>
                )
            case '2':
                return (
                    <div>
                        {
                        this.props.applicationDetail.Contacts.map((data) => (
                            <ApplicationDetailContacts onSaveContactNote = {this.onSaveContactNote} contact = {data} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                        ))
                        }
                    </div>                
                )
            case '3':
                return (
                    <div>
                        {
                        this.props.applicationDetail.FollowUps.map((FollowUp) =>(
                            <ApplicationDetailFollowUp FollowUp = {FollowUp} type ={'application'}/>
                        ))
                        }
                    </div>
                )
            case '4':
                return (
                    <div>
                        {
                        this.props.applicationDetail.Checklists.map((checklist) =>(
                            <ApplicationDetailChecklists Checklist = {checklist} type ={'application'}/>
                        ))
                        }
                    </div>
                )
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
            {this.display()}   
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
                <button className = "sypp-create-detail-button">Conversation Histories</button>
                <button className = "sypp-create-detail-button">Checklists</button>
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

export default connect(mapStatetoProps,mapDispatchToProps)(ApplicationDetailComponents);
