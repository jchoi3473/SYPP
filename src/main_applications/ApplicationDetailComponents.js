import React, {Component, useState} from 'react';
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

function ApplicationDetailComponents(props){
    const [radioValue, setRadioValue] = useState('0');
    const [radioName, setRadioName] = useState('Events');
    const [addDetailName, setDetailName] = useState('');
    const radios =  
    [ 
    { name: 'Events', value: '0' },
    { name: 'Notes', value: '1' },
    { name: 'Contacts', value: '2' },
    { name: 'Conversation History', value: '3' },
    { name: 'Checklists', value: '4' },
    ]
    const [textValue, setTextValue] = useState('');


    const radioChange = (e) => {
    setRadioValue(e.target.value)
    setRadioName(e.target.getAttribute('name'))
    }

    const onChangeTextArea = (e) =>{
        setTextValue(e.target.value)
    }
    const onSaveNote  = (noteContent, noteID) => {
        var applications = props.apps;
        for(var i=0;i<applications.length;i++){
            if(applications[i].applicationID === props.applicationDetail.applicationID){
                for(var j=0; j < props.applicationDetail.Notes.length;j++){
                    if(props.applicationDetail.Notes[j].noteID === noteID){
                        applications[i].Notes[j].Contents = noteContent
                    }
                }
            }
        }
        props.setApps(applications)
    }
    const onSaveConvoNote = (noteContent, contactID) => {
        var applications = props.apps;
        for(var i=0;i<applications.length;i++){
            if(applications[i].applicationID === props.applicationDetail.applicationID){
                for(var j=0; j < props.applicationDetail.Contacts.length;j++){
                    if(props.applicationDetail.Contacts[j].contactID === contactID){
                        applications[i].Contacts[j].Convo = noteContent
                    }
                }
            }
        }
        props.setApps(applications)
    }   
    const onSaveEventNote  = (noteContent, eventID) => {
        var applications = props.apps;
        for(var i=0;i<applications.length;i++){
            if(applications[i].applicationID === props.applicationDetail.applicationID){
                for(var j=0; j < props.applicationDetail.Events.length;j++){
                    if(props.applicationDetail.Events[j].eventID === eventID){
                        applications[i].Events[j].Contents = noteContent
                    }
                }
            }
        }
        props.setApps(applications)
    }

    const display = () =>{
        switch(radioValue){
            case '0':
                return (
                    <div>
                        {
                            props.applicationDetail.Events.map((event) =>(
                                <ApplicationDetailEvents Event = {event} onSaveEventNote = {onSaveEventNote}/>
                            ))
                        }
                    </div>
                )
            case '1':
                return (
                    <div>
                        {
                        props.applicationDetail.Notes.map((note) =>(
                            <ApplicationDetailNotes Note = {note} onSaveNote = {onSaveNote}/>
                        ))
                        }
                    </div>
                )
            case '2':
                return (
                    <div>
                        {props.applicationDetail.Contacts.map((data) => (
                            <ApplicationDetailContacts contact = {data} onSaveConvoNote = {onSaveConvoNote}/>
                        ))
                        }
                    </div>                
                )
            case '3':
                return (
                    <div>
                        {
                        props.applicationDetail.FollowUps.map((FollowUp) =>(
                            <ApplicationDetailFollowUp FollowUp = {FollowUp}/>
                        ))
                        }
                    </div>
                )
            case '4':
                return (
                    <div>
                        {
                        props.applicationDetail.Checklists.map((checklist) =>(
                            <ApplicationDetailChecklists Checklist = {checklist}/>
                        ))
                        }
                    </div>
                )
        }
        
        
    }


    return (
      <div>
          <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
            <div className="sypp-button-container-applicationDetail">
                <ToggleButton
                className={"sypp-applicationDetialButtonGroups sypp-activeChange sypp-hoverChange sypp-text"}
                key={idx}
                type="radio"
                variant="secondary"
                name={radio.name}
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                  <div className = "sypp-radio-button-container-applicationDetail" name = {radio.name} value = {radio.value}>
                    {radio.name}
                  </div>
                </ToggleButton>
                </div>
          ))}
            </ButtonGroup>
            {display()}   
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
                <button>Events</button>
                <button>Notes</button>
                <button>Contacts</button>
                <button>Conversation Histories</button>
                <button>Checklists</button>
                </div>
            </ReactTooltip>
            </div>
      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(ApplicationDetailComponents);
